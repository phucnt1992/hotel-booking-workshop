import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import _ from 'lodash';
import { Repository } from 'typeorm';

import { CryptService } from '../shared/crypt.service';
import { Account } from './account.entity';
import { AccountDto } from './dto/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private cryptService: CryptService,
  ) {}

  public listAccounts(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  public findAccountByUsername(
    username: string,
    select?: any,
  ): Promise<Account> {
    return this.accountRepository.findOneOrFail({ username }, { select });
  }

  public findAccountById(id: string, select?: any): Promise<Account> {
    return this.accountRepository.findOneOrFail({ id }, { select });
  }

  public async setPassword(id: string, password: string): Promise<void> {
    const { salt } = await this.accountRepository.findOneOrFail({
      select: ['salt'],
      where: { id },
    });
    const newPassword = await this.cryptService.hash(password, salt);
    await this.accountRepository.update(id, { password: newPassword });
    return Promise.resolve();
  }

  public checkPassword(
    account: Account,
    rawPassword: string,
  ): Promise<boolean> {
    const { password } = account;
    return this.cryptService.compare(rawPassword, password);
  }

  public updateAccount(
    account: Account,
    accountDto: AccountDto,
  ): Promise<Account> {
    account = plainToClass(Account, accountDto);
    return this.accountRepository.update({ id: account.id }, account);
  }

  public async insertAccount(accountDto: AccountDto): Promise<string> {
    const account = plainToClass(Account, accountDto);

    const insertResult = await this.accountRepository.insert(account);
    if (_.isEmpty(insertResult.identifiers)) {
      throw new Error('New Id is NOT returned.');
    }

    return insertResult.identifiers[0].id;
  }
}
