"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmModuleFactory = exports.typeOrmModule = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const reports_entity_1 = require("src/reports/reports.entity");
const users_entity_1 = require("src/users/users.entity");
exports.typeOrmModule = typeorm_1.TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [users_entity_1.User, reports_entity_1.Reports],
    synchronize: true,
});
exports.typeOrmModuleFactory = typeorm_1.TypeOrmModule.forRootAsync({
    inject: [config_1.ConfigService],
    useFactory: (config) => {
        return {
            type: 'postgres',
            database: config.get('DB_PROD_NAME'),
            username: config.get('DB_PROD_USERNAME'),
            password: config.get('DB_PROD_PASSWORD'),
            port: 5432,
            host: config.get('DB_PROD_HOST'),
            entities: [users_entity_1.User, reports_entity_1.Reports],
        };
    },
});
//# sourceMappingURL=db-config.js.map