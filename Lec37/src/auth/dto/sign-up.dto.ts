import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
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
}
