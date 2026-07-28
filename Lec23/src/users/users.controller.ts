import { Controller, Get, Param, Post, Body, Delete, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "../DTO/users.dto";

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('users')
    getAllUserInformation() {
        return this.usersService.getAllUsers();
    }

    @Get('users/:id')
    getUserById(@Param('id') id: number) {
        return this.usersService.getUserById(id);
    }

    @Post('users')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }
    
    @Delete('users/:id')
    deleteUser(@Param('id') id: number) {
        return this.usersService.deleteUser(id);
    }
    
    @Put('users/:id')
    updateUser(@Param('id') id: number, @Body() updateUserDto: CreateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }
}       
