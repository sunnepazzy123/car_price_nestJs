import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";
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
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [User, Reports],
        };
      },
    })

export const jwtConfig: JwtModuleOptions = {
  secret: 'junior',
  signOptions: { expiresIn: '60s' },
}