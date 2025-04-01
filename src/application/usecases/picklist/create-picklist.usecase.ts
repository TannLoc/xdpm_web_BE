import {ErrorCode} from '@Domain/constants';
import {PicklistEntity} from '@Domain/entity';
import {BadRequestException} from '@Infrastructure/exception';
import {PicklistMapper} from '@Infrastructure/service/mapper/picklist';
import {PicklistRepositoryOrm} from '@Infrastructure/typeorm/postgres/imp-repository';
import {Injectable} from '@nestjs/common';
import {CreatePicklistParamDto} from '@Presentation/picklist/dto/param';
import {PicklistResultDto} from '@Presentation/picklist/dto/result';

@Injectable()
export class CreatePicklistUseCase {
    constructor(
        private readonly picklistRepositoryOrm: PicklistRepositoryOrm,
        private readonly pickListMapper: PicklistMapper,
    ) {
    }

    async execute(param: CreatePicklistParamDto): Promise<PicklistResultDto> {
        var entity = new PicklistEntity({
            label: param.label,
            type: param.type,
        });

        var result = await this.picklistRepositoryOrm.create(entity);
        if (!result) throw new BadRequestException('PL001', ErrorCode.PL001);

        var dataReturn =  this.pickListMapper.toPicklistResultDto(result);
        return dataReturn;
    }
}
