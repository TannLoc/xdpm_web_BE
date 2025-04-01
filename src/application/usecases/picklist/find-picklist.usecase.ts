import {PicklistMapper} from '@Infrastructure/service/mapper/picklist';
import {PicklistRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {PaginationResult} from '@Presentation/dto/result';
import {PicklistFilterDtoParam} from '@Presentation/picklist/dto/param';
import {PicklistResultDto} from '@Presentation/picklist/dto/result';

@Injectable()
export class FindPicklistsUseCase {
    constructor(
        private readonly picklistRepositoryOrm: PicklistRepositoryOrm,
        private readonly pickListMapper: PicklistMapper,
    ) {
    }

    async execute(param: PicklistFilterDtoParam): Promise<PaginationResult<PicklistResultDto>> {
        const {page, pageSize} = param;
        var [data, total] = await this.picklistRepositoryOrm.findAllByFilter(param);

        var dateReturn = data.map((item) => this.pickListMapper.toPicklistResultDto(item));

        return new PaginationResult<PicklistResultDto>({
            data: dateReturn,
            total,
            page,
            pageSize,
        });
    }
}
