"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorGuard = void 0;
const common_1 = require("@nestjs/common");
const role_1 = require("./role");
let EditorGuard = class EditorGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { user } = request;
        let userRole;
        if (user && user.role) {
            userRole = user.role;
        }
        else {
            userRole = request.headers['role'];
        }
        return userRole === role_1.Role.EDITOR || userRole === role_1.Role.ADMIN;
    }
};
exports.EditorGuard = EditorGuard;
exports.EditorGuard = EditorGuard = __decorate([
    (0, common_1.Injectable)()
], EditorGuard);
//# sourceMappingURL=editor.guard.js.map