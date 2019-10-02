import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { from, Observable } from 'rxjs';

@Injectable()
export class CryptService {
  private readonly defaultRounds: number = 10;

  public genSalt(rounds?: number): Observable<string> {
    return from(genSalt(rounds || this.defaultRounds));
  }

  public compare(data: any, encrypted: string): Observable<boolean> {
    return from(compare(data, encrypted));
  }

  public hash(data: any, saltOrRounds?: string | number): Observable<string> {
    return from(hash(data, saltOrRounds || this.defaultRounds));
  }
}
