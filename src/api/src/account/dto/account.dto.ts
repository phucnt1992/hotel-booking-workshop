import {
  IsAlpha,
  IsAlphanumeric,
  IsBoolean,
  IsUUID,
  Length,
} from 'class-validator';

export class AccountDto {
  @IsUUID()
  id: string;

  @IsAlphanumeric()
  username: string;

  @Length(8, 16)
  password: string;

  @IsBoolean()
  isAdmin: string;

  @IsAlpha()
  firstName: string;

  @IsAlpha()
  lastName: string;
}
