import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategyService } from './local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategyService } from './jwt.strategy';
import { jwtConfig } from '../config/db-config';

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
        secret: 'junior',
        signOptions: { expiresIn: '60s' },
    }),
],
  providers: [
    AuthService, 
    LocalStrategyService,
    JwtStrategyService,
    JwtService,
    // {
    //     provide: JWT_PUBLIC_KEY,
    //     useFactory: async (configService: ConfigService) => {
    //         return configService.get('JWT_PUBLIC_KEY')
    //     },
    //     inject: [ConfigService],
    //   },
],
})
export class AuthModule {}
