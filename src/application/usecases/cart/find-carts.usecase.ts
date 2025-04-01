import {CartMapper} from '@Infrastructure/service/mapper/cart';
import {CartRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {FindCartsParamDto} from '@Presentation/cart/dto/param';
import {CartResultDto} from '@Presentation/cart/dto/result';
import {PaginationResult} from '@Presentation/dto/result';

@Injectable()
export class FindCartsUseCase {
    constructor(
        private readonly cartRepositoryOrm: CartRepositoryOrm,
        private readonly cartMapper: CartMapper,
    ) {
    }

    async execute(userId: number, param: FindCartsParamDto) {
        const {page, pageSize} = param;
        var [data, total] = await this.cartRepositoryOrm.findAllByUserId(userId);
        var dateReturn = data.map((item) => this.cartMapper.toCartResultDto(item));

        return new PaginationResult<CartResultDto>({
            data: dateReturn,
            total,
            page,
            pageSize,
        });
    }
}
