import { UsersService } from "./users.service";
import { CreateUserDto } from "../DTO/users.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUserInformation(): {
        id: number;
        name: string;
        age: number;
    }[];
    getUserById(id: number): {
        id: number;
        name: string;
        age: number;
    };
    createUser(createUserDto: CreateUserDto): {
        id: number;
        name: string;
        age: number;
    };
    deleteUser(id: number): {
        id: number;
        name: string;
        age: number;
    };
    updateUser(id: number, updateUserDto: CreateUserDto): {
        id: number;
        name: string;
        age: number;
    };
}
