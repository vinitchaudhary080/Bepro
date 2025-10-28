"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
var swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    var config = new swagger_1.DocumentBuilder()
        .setTitle('BePro API')
        .setDescription('Backend API for BePro — clean & fully typed')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    var document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: { persistAuthorization: true },
    });
}
