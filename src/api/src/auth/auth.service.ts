import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SignOptions } from 'jsonwebtoken';
import { Account } from '../account/account.entity';
import { AccountService } from '../account/account.service';
import { Payload, Token } from './interfaces';

@Injectable()
export class AuthService {
  readonly RefreshTokenConfig: SignOptions = {
    expiresIn: '1d',
  };

  constructor(
    private readonly usersService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const account = await this.usersService.findAccountByUsername(username, [
      'id',
      'username',
      'password',
      'isAdmin',
    ]);

    if (await this.usersService.checkPassword(account, password)) {
      return account;
    }

    return null;
  }

  async verifyAccessToken(token: string): Promise<object> {
    return await this.jwtService.verifyAsync(token);
  }

  async verifyRefreshToken(token: string): Promise<object> {
    return await this.jwtService.verifyAsync(token, this.RefreshTokenConfig);
  }

  async login(account: Account): Promise<Token> {
    const payload: Payload = {
      username: account.username,
      sub: account.id,
      admin: account.isAdmin,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(
        payload,
        this.RefreshTokenConfig,
      ),
    };
  }
}
