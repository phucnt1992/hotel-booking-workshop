import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import _ from 'lodash';
import { EMPTY, from, Observable, throwError } from 'rxjs';
import { catchError, concatMap, first, map, pluck } from 'rxjs/operators';
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

  public listAccounts(): Observable<Account[]> {
    return from(this.accountRepository.find());
  }

  public findAccountByUsername(
    username: string,
    select?: any,
  ): Observable<Account> {
    return from(this.accountRepository.findOneOrFail({ username }, { select }));
  }

  public findAccountById(id: string, select?: any): Observable<Account> {
    return from(this.accountRepository.findOneOrFail({ id }, { select }));
  }

  public setPassword(id: string, password: string): Observable<void> {
    return from(
      this.accountRepository.findOneOrFail({
        select: ['salt'],
        where: { id },
      }),
    ).pipe(
      concatMap(({ salt }) => this.cryptService.hash(password, salt)),
      concatMap(newPassword =>
        from(this.accountRepository.update(id, { password: newPassword })),
      ),
      concatMap(() => EMPTY),
      catchError(err => throwError(err)),
    );
  }

  public checkPassword(
    account: Account,
    rawPassword: string,
  ): Observable<boolean> {
    const { password } = account;

    return from(this.cryptService.compare(rawPassword, password)).pipe(
      map(result => result),
    );
  }

  public updateAccount(
    account: Account,
    accountDto: AccountDto,
  ): Observable<Account> {
    account = plainToClass(Account, accountDto);
    return from(this.accountRepository.save(account));
  }

  public insertAccount(accountDto: AccountDto): Observable<string> {
    const account = plainToClass(Account, accountDto);

    return from(this.accountRepository.insert(account))
      .pipe(map(insertResult => insertResult.generatedMaps))
      .pipe(first())
      .pipe(pluck('id'));
  }
}
