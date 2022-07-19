import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Reports } from './reports/reports.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmModule, typeOrmModuleFactory } from './config/db-config';
import { AuthModule } from './users/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    typeOrmModuleFactory,
    // typeOrmModule,
    UsersModule,
    ReportsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
