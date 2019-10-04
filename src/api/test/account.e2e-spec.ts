import { TypeormAdapter } from '@entity-factory/typeorm';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AccountController } from 'src/account/account.controller';
import { SharedModule } from 'src/shared/shared.module';
import { CoreModule } from 'src/core/core.module';
import { Account } from 'src/account/account.entity';
import { EntityFactory } from '@entity-factory/core';

describe('AccountController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CoreModule.forRoot(), SharedModule],
      controllers: [AccountController],
    })
      .overrideProvider(CatsService)
      .useValue(catsService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect({
        data: catsService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
