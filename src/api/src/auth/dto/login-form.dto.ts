import { IsAlphanumeric, Length } from 'class-validator';

export class LoginFormDto {
  @IsAlphanumeric()
  readonly username: string;

  @Length(8, 16)
  readonly password: string;
}
