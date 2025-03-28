import {type INestApplication} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

function setupSwagger(app: INestApplication) {
    //Swagger
    const config = new DocumentBuilder().setTitle('STC Store Service').setDescription('The Api Service').addCookieAuth('accessToken').build();
    const document = SwaggerModule.createDocument(app, config, {});
    SwaggerModule.setup('swagger', app, document, {
        jsonDocumentUrl: 'swagger/json',
    });
}

export default setupSwagger;
