import { Injectable, HttpException } from "@nestjs/common";
import { CreateUserDto } from "../DTO/users.dto";

@Injectable()
export class UsersService {
    
    users = [
        {
            id: 1,
            name: 'gio',
            age: 25,
        },
        {
            id: 2,
            name: 'mari',
            age: 26,
        },
        {
            id: 3,
            name: 'lika',
            age: 27,
        },
        {
            id: 4,
            name: 'saba',
            age: 28,
        },
        {
            id: 5,
            name: 'nino',
            age: 29,
        },
        {
            id: 6,
            name: 'nika',
            age: 30,
        },
        {
            id: 7,
            name: 'salo',
            age: 31,
        }       
    ];

    getAllUsers() {
        return this.users;
    }
    
    getUserById(id: number) {
        const user = this.users.find(user => user.id === Number(id));
        if(!user) throw new HttpException('User not found', 404);
        return user;
    }

    createUser(createUserDto: CreateUserDto) {
        const user = {
            id: this.users.length + 1,
            name: createUserDto.name,
            age: createUserDto.age,
        };
        this.users.push(user);
        return user;
    }

    deleteUser(id: number) {
        const user = this.users.find(user => user.id === Number(id));
        if(!user) throw new HttpException('User not found', 404);
        this.users = this.users.filter(user => user.id !== Number(id));
        return user;
    }

    updateUser(id: number, updateUserDto: CreateUserDto) {
        const user = this.users.find(user => user.id === Number(id));
        if(!user) throw new HttpException('User not found', 404);
        user.name = updateUserDto.name;
        user.age = updateUserDto.age;
        return user;
    }       
}


