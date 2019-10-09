import { TypeormAdapter } from '@entity-factory/typeorm';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { Account } from 'src/account';
import { AuthModule } from 'src/auth';
import { CoreModule } from 'src/core';
import { SharedModule } from 'src/shared';
import { accountfactory, AdminState } from './factory';

describe('AccountController (e2e)', () => {
  let app: INestApplication;
  let adminAccount: Account;
  let account: Account;

  const BASE_URL = 'accounts';
  beforeAll(async () => {
    adminAccount = await accountfactory
      .for(Account)
      .state(AdminState)
      .create();

    account = await accountfactory.for(Account).create();

    const module = await Test.createTestingModule({
      imports: [CoreModule.forRoot(), SharedModule, AuthModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
});
