import { AuthService } from './auth.service';
import { SingUpDto } from './DTO/sign-up.dto';
import { SignInDto } from './DTO/sing-in.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SingUpDto): Promise<{
        message: string;
    }>;
    signIn(signInDto: SignInDto): Promise<string>;
    currentUser(userId: string): Promise<import("mongoose").Document<unknown, {}, import("../users/schema/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../users/schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
