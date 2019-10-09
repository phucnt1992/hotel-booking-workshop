import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SignOptions } from 'jsonwebtoken';
import { AccountService } from '../account/account.service';
import { Payload, Token, User } from './interfaces';

@Injectable()
export class AuthService {
  readonly RefreshTokenConfig: SignOptions = {
    expiresIn: '1d',
  };

  constructor(
    private readonly usersService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const account = await this.usersService.findAccountByUsername(username, [
      'id',
      'username',
      'password',
      'isAdmin',
    ]);

    if (await this.usersService.checkPassword(account, password)) {
      return {
        id: account.id,
        username: account.username,
        IsAdmin: account.isAdmin,
      };
    }

    return null;
  }

  async verifyAccessToken(token: string): Promise<Payload> {
    return (await this.jwtService.verifyAsync(token)) as Payload;
  }

  async verifyRefreshToken(token: string): Promise<Payload> {
    return (await this.jwtService.verifyAsync(
      token,
      this.RefreshTokenConfig,
    )) as Payload;
  }

  async login(user: User): Promise<Token> {
    const payload: Payload = {
      username: user.username,
      sub: user.id,
      admin: user.IsAdmin,
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
