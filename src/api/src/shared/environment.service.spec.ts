import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
  let service: EnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvironmentService],
    }).compile();

    service = module.get<EnvironmentService>(EnvironmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('isProd should return fail in test env', () => {
    expect(service.isProdEnv()).toBeFalsy();
  });

  it('isProd should return true in prod env', () => {
    spyOn(service, 'getEnv').and.returnValue('production');
    expect(service.isTestEnv()).toBeFalsy();
  });

  it('isTest should return true in test env', () => {
    expect(service.isTestEnv()).toBeTruthy();
  });

  it('isTest should return false in prod env', () => {
    spyOn(service, 'getEnv').and.returnValue('production');
    expect(service.isTestEnv()).toBeFalsy();
  });
});
