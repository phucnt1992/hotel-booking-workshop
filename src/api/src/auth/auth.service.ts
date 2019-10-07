import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Account } from '../account/account.entity';
import { AccountService } from '../account/account.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const account = await this.usersService.findAccountByUsername(username, [
      'id',
      'username',
      'password',
    ]);

    if (await this.usersService.checkPassword(account, password)) {
      account.password = null;
      return account;
    }

    return null;
  }

  async verify(token: string): Promise<object> {
    return await this.jwtService.verifyAsync(token);
  }

  async login(account: Account) {
    const payload = { username: account.username, sub: account.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
