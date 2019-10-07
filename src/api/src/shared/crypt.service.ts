import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { from, Observable } from 'rxjs';

@Injectable()
export class CryptService {
  private readonly defaultRounds: number = 10;

  public async genSalt(rounds?: number): Promise<string> {
    return await genSalt(rounds || this.defaultRounds);
  }

  public async compare(data: any, encrypted: string): Promise<boolean> {
    return await compare(data, encrypted);
  }

  public async hash(
    data: any,
    saltOrRounds?: string | number,
  ): Promise<string> {
    return await hash(data, saltOrRounds || this.defaultRounds);
  }
}
