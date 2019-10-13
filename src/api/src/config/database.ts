import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const connectionOptions: PostgresConnectionOptions = {
  type: 'postgres',
  url: 'postgres://localhost:p%40ssw0rd@postgres:5432/postgres',
  uuidExtension: 'uuid-ossp',
  synchronize: true,
  entities: [],
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: process.env.TYPEORM_ENTITIES.split(','),
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
};

export default connectionOptions;
