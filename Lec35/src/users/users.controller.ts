import { Controller, Get, Param, Delete, Patch, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from '../auth/guards/jwt-roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../decorators/user.decorators';
import { Role } from '../enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch()
  @Auth()
  updateMyAccount(@User('sub') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
