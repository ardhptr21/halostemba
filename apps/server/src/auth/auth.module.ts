import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from '~/core/user/user.repository';
import { MagiclinkModule } from '~/providers/magiclink/magiclink.module';
import { OtpModule } from '~/providers/otp/otp.module';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MagiclinkModule,
    OtpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET_KEY,
          signOptions: { expiresIn: '3d' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategy, UserRepository],
})
export class AuthModule {}
