import { EntityFactory } from '@entity-factory/core';
import { TypeormAdapter, TypeormBlueprint } from '@entity-factory/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { genSalt, hash } from 'bcrypt';

import { Account } from 'src/account/account.entity';

import { baseTypeormAdapterOptions } from './shared.factory';

const accountTypeormAdapterOptions: PostgresConnectionOptions = {
  ...baseTypeormAdapterOptions,
  entities: [Account],
};
const accountTypeormAdapter = new TypeormAdapter(accountTypeormAdapterOptions);

class AccountBlueprint extends TypeormBlueprint<Account> {
  constructor() {
    super();
    this.type(Account);
    this.options({
      generateId: true,
    });

    this.define(async ({ faker, factory }) => {
      const account = this.generateAccount(faker);
      return {
        ...account,
        isAdmin: false,
      };
    });

    this.state('admin', async ({ faker, factory }) => {
      const account = this.generateAccount(faker);
      return {
        ...account,
        isAdmin: true,
      };
    });
  }

  private async generateAccount(faker: Faker.FakerStatic) {
    const salt = await genSalt();
    const password = await hash('p@ssw0rd', salt);

    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password,
      salt,
      username: faker.internet.userName(),
      avatarUrl: faker.image.avatar(),
    };
  }
}

export const accountfactory = new EntityFactory({
  adapter: accountTypeormAdapter,
  blueprints: [AccountBlueprint],
});
