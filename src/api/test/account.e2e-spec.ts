import { TypeormAdapter } from '@entity-factory/typeorm';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AccountController } from 'src/account/account.controller';
import { SharedModule } from 'src/shared/shared.module';
import { CoreModule } from 'src/core/core.module';
import { accountfactory, AdminState } from './factory/account.factory';
import { Account } from '../src/account/account.entity';
import { AccountModule } from '../src/account/account.module';

describe('AccountController (e2e)', () => {
  let app: INestApplication;
  let adminAccount: Account;
  let accounts: Account[];

  const BASE_URL = 'accounts';
  beforeAll(async () => {
    adminAccount = await accountfactory
      .for(Account)
      .state(AdminState)
      .create();

    accounts = await accountfactory.for(Account).create(3);

    const module = await Test.createTestingModule({
      imports: [CoreModule.forRoot(), SharedModule, AccountModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET ${accounts}`, () => {
    return request(app.getHttpServer())
      .get(`/${accounts}`)
      .expect(200);
  });

  it(`/GET a account`, () => {});

  afterAll(async () => {
    await app.close();
  });
});
