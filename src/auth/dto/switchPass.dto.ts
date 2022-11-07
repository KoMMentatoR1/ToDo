import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

export class SwitchPassDto {
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly id: number;
  @IsString({ message: 'Должно быть строкой' })
  readonly newPass: string;
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;
}
