import {Controller, Get, Res} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Response} from 'express';

@Controller()
@ApiTags('App Controller')
export class AppController {
    @Get()
    getHello(@Res() res: Response) {
        res.send('STC Service Api');
    }
}
