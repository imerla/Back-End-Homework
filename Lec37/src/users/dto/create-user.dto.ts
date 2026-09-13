import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { Role } from '../../enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'john@example.com', description: 'User email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password (min 6 characters)',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ enum: Role, description: 'User role' })
  @IsEnum(Role)
  role!: Role;
}
