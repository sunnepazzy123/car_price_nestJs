import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reports } from "src/reports/reports.entity";
import { User } from "src/users/users.entity";

export const typeOrmModule = TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Reports],
      synchronize: true,
    });

export const typeOrmModuleFactory = TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          database: config.get<string>('DB_PROD_NAME'),
          username: config.get('DB_PROD_USERNAME'),
          password: config.get('DB_PROD_PASSWORD'),
          port: 5432,
          host: config.get('DB_PROD_HOST'),
          // synchronize: true,
          entities: [User, Reports],
        };
      },
    })
