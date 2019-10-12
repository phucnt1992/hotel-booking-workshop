import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AccountModule } from '../account/account.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtFactoryService } from './jwt-factory.service';
import { JwtStrategy } from './jwt-strategy.service';

@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtFactoryService,
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
