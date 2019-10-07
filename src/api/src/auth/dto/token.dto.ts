import { IsAlphanumeric, Length } from 'class-validator';

export class TokenDto {
  @IsAlphanumeric()
  readonly token: string;
}
