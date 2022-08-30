"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const common_1 = require("@nestjs/common");
const cookieSession = require('cookie-session');
const setupApp = (app) => {
    app.use(cookieSession({
        keys: ['13232'],
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    return app;
};
exports.setupApp = setupApp;
//# sourceMappingURL=setupApp.js.map