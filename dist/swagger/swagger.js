"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDoc = void 0;
const swagger_1 = require("@nestjs/swagger");
const swaggerDoc = (app) => {
    const userConfig = new swagger_1.DocumentBuilder()
        .setDescription('The Application API description')
        .setVersion('2.0')
        .addTag('app')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, userConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
};
exports.swaggerDoc = swaggerDoc;
//# sourceMappingURL=swagger.js.map