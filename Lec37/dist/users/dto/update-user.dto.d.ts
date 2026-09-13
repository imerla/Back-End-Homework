import { CreateUserDto } from './create-user.dto';
import { Role } from '../../enums/role.enum';
declare const UpdateUserDto_base: import("@nestjs/mapped-types", { with: { "resolution-mode": "import" } }).MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    name?: string;
    email?: string;
    password?: string;
    role?: Role;
}
export {};
