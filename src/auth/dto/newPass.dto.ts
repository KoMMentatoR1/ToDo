import { IsEmail, IsString } from 'class-validator';

export class newPassDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email;
  @IsString({ message: 'Должно быть строкой' })
  readonly code;
  @IsString({ message: 'Должно быть строкой' })
  readonly newPass;
}
