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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasUserIdGuard = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../users/schema/user.schema");
let HasUserIdGuard = class HasUserIdGuard {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const userId = request.headers['user-id'];
        if (!userId) {
            throw new common_1.BadRequestException('User ID header is required');
        }
        if (!(0, mongoose_2.isValidObjectId)(userId)) {
            throw new common_1.BadRequestException('Invalid User ID format');
        }
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        request.user = user;
        return true;
    }
};
exports.HasUserIdGuard = HasUserIdGuard;
exports.HasUserIdGuard = HasUserIdGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], HasUserIdGuard);
//# sourceMappingURL=hasUserId.guards.js.map