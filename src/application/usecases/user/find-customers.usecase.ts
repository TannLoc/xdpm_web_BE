import {Injectable} from '@nestjs/common';
import {UserRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {PaginationResult} from "@Presentation/dto/result";
import {CustomerFilterDtoParam} from "@Presentation/user/dto/param";

@Injectable()
export class FindCustomersUsecase {
    constructor(
        private readonly userRepository: UserRepositoryOrm,
    ) {
    }

    async execute(param: CustomerFilterDtoParam) {
        const {page, pageSize} = param;
        var [data, total] = await this.userRepository.findAllCustomer(param);
        return new PaginationResult<any>({
            data,
            total,
            page,
            pageSize,
        });
    }
}
