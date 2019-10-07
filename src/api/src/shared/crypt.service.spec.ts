import { Test, TestingModule } from '@nestjs/testing';
import { map } from 'rxjs/operators';
import { CryptService } from './crypt.service';

describe('CryptService', () => {
  let service: CryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptService],
    }).compile();

    service = module.get<CryptService>(CryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('genSalt should return salt', async () => {
    const salt = await service.genSalt();
    expect(salt).toBeInstanceOf(typeof String);
  });

  it('hash should return ecrypted data', () => {
    const data = 'test';
    service.hash(data).subscribe(encrypted => {
      expect(encrypted).not.toEqual(data);
    });
  });

  it('compare should return true with same data', () => {
    const data = 'test';
    service
      .hash(data)
      .pipe(map(encrypted => service.compare(data, encrypted)))
      .subscribe(isMatched => {
        expect(isMatched).toBeTruthy();
      });
  });

  it('compare should return false with different data', () => {
    const data = 'test';
    service
      .hash(data)
      .pipe(map(encrypted => service.compare('different data', encrypted)))
      .subscribe(isMatched => {
        expect(isMatched).toBeFalsy();
      });
  });
});
