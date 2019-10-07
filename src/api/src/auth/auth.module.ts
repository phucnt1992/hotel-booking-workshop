import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AccountModule } from '../account/account.module';

import { AuthService } from './auth.service';
import { JwtFactoryService } from './jwt-factory.service';
import { JwtStrategy } from './jwt-strategy.service';
import { LocalStrategy } from './local-strategy.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtFactoryService,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
