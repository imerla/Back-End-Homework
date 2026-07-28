"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
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
    getUserById(id) {
        const user = this.users.find(user => user.id === Number(id));
        if (!user)
            throw new common_1.HttpException('User not found', 404);
        return user;
    }
    createUser(createUserDto) {
        const user = {
            id: this.users.length + 1,
            name: createUserDto.name,
            age: createUserDto.age,
        };
        this.users.push(user);
        return user;
    }
    deleteUser(id) {
        const user = this.users.find(user => user.id === Number(id));
        if (!user)
            throw new common_1.HttpException('User not found', 404);
        this.users = this.users.filter(user => user.id !== Number(id));
        return user;
    }
    updateUser(id, updateUserDto) {
        const user = this.users.find(user => user.id === Number(id));
        if (!user)
            throw new common_1.HttpException('User not found', 404);
        user.name = updateUserDto.name;
        user.age = updateUserDto.age;
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map