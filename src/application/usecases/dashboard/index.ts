import {
    BrandRepositoryOrm,
    InventoryRepositoryOrm,
    OrderRepositoryOrm,
    ProductRepositoryOrm,
    UserRepositoryOrm
} from "@Infrastructure/typeorm/postgres/imp-repository";
import {Injectable} from "@nestjs/common";
import {DashboardResultDto} from "@Presentation/dashboard/dto";
import {OrderState} from "@Domain/constants";

@Injectable()
export class DashboardUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryOrm,
        private readonly orderRepository: OrderRepositoryOrm,
        private readonly inventoryRepository: InventoryRepositoryOrm,
        private readonly userRepository: UserRepositoryOrm,
        private readonly brandRepository: BrandRepositoryOrm
    ) {
    }

    async execute() {
        var dataReturn = new DashboardResultDto();
        dataReturn.totalOrderCancel = await this.orderRepository.countByState(OrderState.CANCELED)
        dataReturn.totalOrderReturned = await this.orderRepository.countByState(OrderState.RETURNED)
        dataReturn.totalOrderDelivering = await this.orderRepository.countByState(OrderState.DELIVERING)
        dataReturn.totalOrderReceived = await this.orderRepository.countByState(OrderState.RECEIVED)
        dataReturn.totalOrderConfirmed = await this.orderRepository.countByState(OrderState.CONFIRMED)
        dataReturn.totalOrderWaitingConfirm = await this.orderRepository.countByState(OrderState.WAITING_CONFIRM)

        dataReturn.totalRevenue = await this.orderRepository.sumTotalBill() ?? 0;

        dataReturn.totalCustomer = await this.userRepository.countCustomer();

        dataReturn.totalProduct = await this.productRepository.count();

        dataReturn.totalProductImport = await this.inventoryRepository.sumTotalImport() ?? 0
        dataReturn.totalProductSold = await this.inventoryRepository.sumTotalSold()?? 0
        dataReturn.totalProductStock = await this.inventoryRepository.sumTotalStock()?? 0

        dataReturn.totalBrand = await this.brandRepository.countTotalBrand();

        return dataReturn;
    }
}
