import {PicklistEntity} from '@Domain/entity';
import {Injectable} from '@nestjs/common';
import {PicklistResultDto} from '@Presentation/picklist/dto/result';

@Injectable()
export class PicklistMapper {
    toPicklistResultDto(param: PicklistEntity): PicklistResultDto {
        var dto = new PicklistResultDto();
        dto.id = param.id;
        dto.label = param.label;
        return dto;
    }
}
