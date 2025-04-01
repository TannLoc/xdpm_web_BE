import {Module} from '@nestjs/common';
import {FindProfileUsecase, UpdateProfileUsecase} from '@Application/usecases/user';
import {UserController} from '@Presentation/user/controller/user.controller';
import {FindCustomersUsecase} from "@Application/usecases/user/find-customers.usecase";
import {UserManagementController} from "@Presentation/user/controller/user-management.controller";

@Module({
    imports: [],
    controllers: [UserController, UserManagementController],
    providers: [FindProfileUsecase, UpdateProfileUsecase, FindCustomersUsecase],
})
export class UserModule {
}
