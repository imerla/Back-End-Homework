import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signUp(signUpDto: SignUpDto): Promise<import("mongoose").Document<unknown, {}, import("../users/schema/user.schema").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../users/schema/user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    signIn(signInDto: SignInDto): Promise<string>;
    getCurrentUser(userId: string): Promise<import("mongoose").Document<unknown, {}, import("../users/schema/user.schema").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../users/schema/user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
