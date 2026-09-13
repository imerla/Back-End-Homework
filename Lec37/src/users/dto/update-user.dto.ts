import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../enums/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    required: false,
    example: 'John Doe',
    description: 'User name',
  })
  name?: string;

  @ApiProperty({
    required: false,
    example: 'john@example.com',
    description: 'User email',
  })
  email?: string;

  @ApiProperty({
    required: false,
    example: 'password123',
    description: 'User password (min 6 characters)',
  })
  password?: string;

  @ApiProperty({
    required: false,
    enum: Role,
    description: 'User role',
  })
  role?: Role;
}
