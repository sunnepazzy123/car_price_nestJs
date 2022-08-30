"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const setupApp_1 = require("./setupApp");
const helmet_1 = require("helmet");
const swagger_1 = require("./swagger/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use((0, helmet_1.default)());
    const setApp = (0, setupApp_1.setupApp)(app);
    (0, swagger_1.swaggerDoc)(setApp);
    await setApp.listen(process.env.PORT || 3333);
    console.log("listening on port:", process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map