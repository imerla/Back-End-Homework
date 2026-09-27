import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ISAdminGuard } from '../auth/guards/isAdmin.guard';
import { User } from '../decorator/user.decorator';

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
  @UseGuards(AuthGuard)
  update(@User() userId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard)
  removeMe(@User() userId) {
    return this.usersService.remove(userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, ISAdminGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
