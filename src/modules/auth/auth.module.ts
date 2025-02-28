import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategyService } from './strategies/jwt/jwt-strategy.service';
import { LocalStrategy } from './strategies/local/local.strategy';
import { PrismaService } from '../../config/database/PrismaService';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'abcd123456',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategyService, PrismaService],
})
export class AuthModule {}
