import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SingUpDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 25)
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;
}
