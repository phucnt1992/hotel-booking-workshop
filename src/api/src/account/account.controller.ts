import {
  All,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UnprocessableEntityException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, concatMap, flatMap, map } from 'rxjs/operators';
import { Operation } from 'fast-json-patch';

import { JsonPatchPipe } from '../shared/json-patch.pipe';

import { Account } from './account.entity';
import { AccountService } from './account.sevice';
import { AccountDto } from './dto/account.dto';

const BASE_URL = 'accounts';

@Controller(BASE_URL)
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get(':id')
  public findOne(@Param('id') id: string): Observable<Account> {
    return this.accountService.findAccountById(id);
  }

  @Get()
  public getAll(): Observable<Account[]> {
    return this.accountService.listAccounts();
  }

  @Post()
  @UsePipes(ValidationPipe)
  public createOne(
    @Body() accountDto: AccountDto,
    @Res() response: Response,
  ): void {
    this.accountService.insertAccount(accountDto).subscribe(
      id => {
        response.header('location', `${BASE_URL}/${id}`);
        response.status(HttpStatus.CREATED).send();
      },
      err => {
        throw new UnprocessableEntityException(err);
      },
    );
  }

  @Put(':id')
  public updateOne(
    @Param('id') id: string,
    @Body(ValidationPipe) accountDto: AccountDto,
  ): Observable<Account> {
    return this.accountService.findAccountById(id).pipe(
      catchError(err => throwError(new NotFoundException())),
      concatMap(account =>
        this.accountService.updateAccount(account, accountDto),
      ),
      catchError(err => throwError(new UnprocessableEntityException())),
    );
  }

  @Patch('id')
  public patchOne(
    @Param('id') id: string,
    @Body(JsonPatchPipe) jsonPatch: Operation[],
  ) {}

  @All()
  @HttpCode(HttpStatus.METHOD_NOT_ALLOWED)
  public all(): Observable<void> {
    return EMPTY;
  }
}
