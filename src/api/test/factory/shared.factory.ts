import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const baseTypeormAdapterOptions: PostgresConnectionOptions = {
  type: 'postgres',
  url: 'postgres://localhost:p%40ssw0rd@postgres:5432/postgres',
  uuidExtension: 'uuid-ossp',
  dropSchema: true,
  synchronize: true,
  entities: [],
};
