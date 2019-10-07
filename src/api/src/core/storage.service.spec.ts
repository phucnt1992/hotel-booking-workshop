import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from './storage.service';

import { EnvironmentService } from '../shared';

describe('StorageService', () => {
  let service: StorageService;
  let environmentService: EnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageService, EnvironmentService],
    }).compile();

    service = module.get<StorageService>(StorageService);
    environmentService = module.get<EnvironmentService>(EnvironmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getConfig should return configuration options', () => {
    const expectedResult = {};
    expect(service.getConfig()).toStrictEqual();
  });
});
