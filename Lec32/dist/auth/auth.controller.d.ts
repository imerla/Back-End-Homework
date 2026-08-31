import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<import("mongoose").Document<unknown, {}, import("../users/schema/user.schema").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../users/schema/user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    signIn(signInDto: SignInDto): Promise<{
        access_token: string;
    }>;
}
