import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsEmail,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsNumber()
  @Min(0)
  @Max(150)
  age!: number;

  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
