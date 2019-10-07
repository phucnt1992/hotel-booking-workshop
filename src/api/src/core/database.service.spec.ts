import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { DatabaseService } from './database.service';

import { EnvironmentService } from '../shared';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let environmentService: EnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService, EnvironmentService],
    }).compile();

    environmentService = module.get<EnvironmentService>(EnvironmentService);
    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return testing environment', () => {
    const expectedResult: TypeOrmModuleOptions = {
      url: 'postgres://localhost:p%40ssw0rd@postgres:5432/postgres',
      type: 'postgres',
      synchronize: true,
      uuidExtension: 'uuid-ossp',
      retryAttempts: 3,
    };
    expect(service.createTypeOrmOptions()).toStrictEqual(expectedResult);
  });

  it('should return production environment', () => {
    const expectedResult: TypeOrmModuleOptions = {
      url: 'this-is-production-url',
      type: 'postgres',
      synchronize: true,
      uuidExtension: 'uuid-ossp',
      retryAttempts: 3,
    };
    spyOn(environmentService, 'getEnv').and.returnValue(
      'this-is-production-url',
    );

    expect(service.createTypeOrmOptions()).toStrictEqual(expectedResult);
  });
});
