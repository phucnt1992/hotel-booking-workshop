import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { EnvironmentService } from '../shared/environment.service';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  dbUrlKey = 'DB_URL';

  constructor(private environmentService: EnvironmentService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    let url: string;

    if (this.environmentService.isTestEnv()) {
      url = 'postgres://localhost:p%40ssw0rd@postgres:5432/postgres';
    } else {
      url = this.environmentService.getEnv(this.dbUrlKey);
    }

    return {
      type: 'postgres',
      synchronize: true,
      uuidExtension: 'uuid-ossp',
      retryAttempts: 3,
      url,
    };
  }
}
