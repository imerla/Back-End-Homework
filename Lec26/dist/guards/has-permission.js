"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasPermission = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const role_1 = require("./role");
let HasPermission = class HasPermission {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(role_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const { user } = request;
        let userRole;
        if (user && user.role) {
            userRole = user.role;
        }
        else {
            userRole = request.headers['role'];
        }
        if (!userRole) {
            return false;
        }
        const roleHierarchy = [role_1.Role.VIEWER, role_1.Role.EDITOR, role_1.Role.ADMIN];
        const userRoleIndex = roleHierarchy.indexOf(userRole);
        return requiredRoles.some((requiredRole) => {
            const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
            return userRoleIndex >= requiredRoleIndex;
        });
    }
};
exports.HasPermission = HasPermission;
exports.HasPermission = HasPermission = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], HasPermission);
//# sourceMappingURL=has-permission.js.map