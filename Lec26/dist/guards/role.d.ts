export declare enum Role {
    ADMIN = "admin",
    EDITOR = "editor",
    VIEWER = "viewer"
}
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
