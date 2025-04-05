import { CreatedResultDto } from '@Presentation/dto/result';
import { CartRepositoryOrm, InventoryRepositoryOrm, OrderRepositoryOrm, UserRepositoryOrm } from '@Infrastructure/typeorm/postgres/imp-repository';
import { CreateOrderParamDto } from '@Presentation/order/dto/param';
import { BadRequestException } from '@Infrastructure/exception';
import { DeliveryEntity, OrderEntity, OrderItemEntity, PaymentEntity } from '@Domain/entity';
import { Injectable } from '@nestjs/common';
import { ErrorCode, OrderPaymentType, PaymentState } from '@Domain/constants';
import { VnpayService } from '@Infrastructure/service/vnpay/vnpay.service';
import {
  dateFormat,
  ProductCode,
  VnpLocale,
  type Bank,
  type BuildPaymentUrl,
  type QueryDr,
  type QueryDrResponse,
  type Refund,
  type ReturnQueryFromVNPay,
  type VerifyIpnCall,
  type VerifyReturnUrl,
} from 'vnpay';
import { Request } from 'express';
import { CreatedOrderResultDto } from '@Presentation/order/dto/result/created-order.result.dto';
import { EnvConfigurationService } from '@Infrastructure/env-configuration';
@Injectable()
export class CreateOrderUsecase {
  constructor(
    private readonly userRepository: UserRepositoryOrm,
    private readonly orderRepository: OrderRepositoryOrm,
    private readonly cartRepository: CartRepositoryOrm,
    private readonly vnpayService: VnpayService,
    private readonly configService: EnvConfigurationService
  ) {}

  async execute(userId: number, param: CreateOrderParamDto,request: Request) {
    const { cartIds, delivery, paymentType } = param;
    var cartsEntity = await this.cartRepository.findAllByIds(cartIds);
    let totalQuantity: number = 0,
      totalBill: number = 0,
      error: string[] = [],
      deliveryEntity: DeliveryEntity;

      if (cartsEntity.length == 0) throw new BadRequestException('ORDER010', ErrorCode.ORDER010);

    let user = await this.userRepository.findOneById(userId);
    if (!user) throw new BadRequestException('ORDER005', ErrorCode.ORDER005);

    cartsEntity.map((item) => {
      const { product, quantity } = item;
      if (product.inventory.stock < quantity) error.push(`${product.code} is out of stock`);
    });

    if (error && error.length > 0) throw new BadRequestException('ORDER008', error);

    const orderItems = cartsEntity.map(({ product, quantity }) => {
      return new OrderItemEntity({
        quantity,
        product,
        salePrice: product.salesPrice,
      });
    });

    orderItems.map(async (item) => {
      var inventory = item.product.inventory;

      inventory.stock -= item.quantity;
      inventory.sold += item.quantity;
      totalQuantity += item.quantity;
      totalBill += item.salePrice * item.quantity;
      return item;
    });

    deliveryEntity = new DeliveryEntity({
      note: delivery.note,
      city: delivery.city,
      district: delivery.district,
      ward: delivery.ward,
      text: delivery.text,
    });

    const paymentEntity = new PaymentEntity({
        type: paymentType,

    })
    let url 

    const entity = new OrderEntity({
      customer: user,
      delivery: deliveryEntity,
      items: orderItems,
      totalQuantity: totalQuantity,
      totalBill: totalBill,
      payment: paymentEntity,
      code: this.generateUniqueCode(user.id)
    });
    const result = await this.orderRepository.create(entity);

    if(paymentType === OrderPaymentType.VNPAY){
      url = this.buildUrlPayment(paymentId,entity.code,totalBill, request)
    }
    var paymentId= result.payment.id;
    await this.cartRepository.deleteByIds(cartIds);
    if (!result) throw new BadRequestException('ORDER001', ErrorCode.ORDER001);
    return new CreatedOrderResultDto({ 
      orderId: result.id,
      orderCode: result.code,
      orderPaymentType: paymentType,
      url: url
     });
  }

  private generateUniqueCode(orderId: number): string {
    const unixTimestamp = Math.floor(Date.now() / 1000); 
    return `${orderId}${unixTimestamp}`;
  }

  private  buildUrlPayment(paymentId: number,orderCode: string,totalBill: number,request: Request){
      const callBackurl = this.configService.getCallBackUrlVnPay();

    const paymentUrl = this.vnpayService.buildPaymentUrl({
      vnp_Amount: totalBill,
      vnp_IpAddr:  this.getClientIp(request),
      vnp_TxnRef: `${orderCode}`,
      vnp_OrderInfo: `${orderCode}`,
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: callBackurl,
      vnp_Locale: VnpLocale.VN,  
      vnp_CreateDate: dateFormat(new Date()), 
  });
  return paymentUrl
  }

  private getClientIp(request: Request): string {
    const forwarded = request.headers['x-forwarded-for'];
    if (Array.isArray(forwarded)) {
      return forwarded[0];
    }
    return forwarded || request.socket.remoteAddress || '';
  }
}
