import { IsAlphanumeric, Length } from 'class-validator';

export class LoginFormDto {
  @IsAlphanumeric()
  username: string;

  @Length(8, 16)
  password: string;
}
