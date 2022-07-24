import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategyService } from './strategy/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategyService } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '600s' },
        };
      },
      inject: [ConfigService],
    }),
],
  providers: [
    AuthService, 
    LocalStrategyService,
    JwtStrategyService,
    JwtService,
    GoogleStrategy,
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
