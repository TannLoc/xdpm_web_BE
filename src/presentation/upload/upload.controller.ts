import {Controller, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {ApiBody, ApiConsumes, ApiTags} from '@nestjs/swagger';

//Application
import {UploadUseCase} from '@Application/usecases/upload';

//Domain
import {UPLOADS_ROUTERS, UserRole} from '@Domain/constants';
import {AuthGuard} from '@Domain/guards';

//Infrastructure
import {ApiResponse, Roles} from '@Infrastructure/decorator';

//Dto
import {CloudinaryResultDto} from './dto/result';

@UseGuards(AuthGuard)
@Roles(UserRole.ADMIN, UserRole.CUSTOMER)
@ApiTags('Upload Controller')
@Controller(UPLOADS_ROUTERS.CONTROLLER)
export class UploadController {
    constructor(private readonly uploadUseCase: UploadUseCase) {
    }

    //Upload File Or Image
    @Post(UPLOADS_ROUTERS.CREATE)
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({
        type: CloudinaryResultDto,
    })
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File) {
        const result = await this.uploadUseCase.execute(file);
        return result;
    }
}
