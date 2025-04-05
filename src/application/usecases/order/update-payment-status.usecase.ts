import { PaymentState } from "@Domain/constants";
import { VnpayService } from "@Infrastructure/service/vnpay/vnpay.service";
import { OrderRepositoryOrm, PaymentRepositoryOrm } from "@Infrastructure/typeorm/postgres/imp-repository";
import { Injectable } from "@nestjs/common";
import { ReturnQueryFromVNPay } from "@Presentation/order/dto/param/call-back-vnpay.param.dto";
import { PaymentOrderResultDto } from "@Presentation/order/dto/result/payment-order.result.dto";
@Injectable()
export class UpdatePaymentStateOrderUsecase {
    constructor(
        private readonly orderRepositoryOrm: OrderRepositoryOrm,
        private readonly vnPayService: VnpayService
    ) {}

    async execute(param: ReturnQueryFromVNPay) {
        param.vnp_Amount = param.vnp_Amount/ 100;
        const isValid = await this.vnPayService.verifyReturnUrl(param);
        if (!isValid) {
            throw new Error("Invalid VNPAY signature.");
        }

        const order = await this.orderRepositoryOrm.getPaymentByCode(param.vnp_OrderInfo);
        var payment =order.payment
        if (!payment) {
            throw new Error("Payment not found.");
        }

        if (isValid.isSuccess) {
            payment.state = PaymentState.SUCCESS
        } else {
            payment.state = PaymentState.FAIL
        }

       

        await this.orderRepositoryOrm.updateOne(order);

        return new PaymentOrderResultDto({
            orderCode: param.vnp_OrderInfo,
            isSuccess: isValid.isSuccess,
            payDate: isValid.vnp_PayDate,
            amount: isValid.vnp_Amount,
        })
    }


}
