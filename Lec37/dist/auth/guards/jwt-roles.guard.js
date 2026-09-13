"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const roles_guard_1 = require("./roles.guard");
const user_decorators_1 = require("../../decorators/user.decorators");
function Auth(...roles) {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), ...roles.length > 0 ? [(0, user_decorators_1.Roles)(...roles)] : []);
}
//# sourceMappingURL=jwt-roles.guard.js.map