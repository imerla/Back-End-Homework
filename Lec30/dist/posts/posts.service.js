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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("./schema/post.schema");
const user_schema_1 = require("../users/schema/user.schema");
let PostsService = class PostsService {
    postModel;
    userModel;
    constructor(postModel, userModel) {
        this.postModel = postModel;
        this.userModel = userModel;
    }
    async create(createPostDto, userId) {
        const post = new this.postModel({ ...createPostDto, user: userId });
        const savedPost = await post.save();
        await this.userModel.updateOne({ _id: userId, posts: { $exists: false } }, { $set: { posts: [] } }).exec();
        await this.userModel.findByIdAndUpdate(userId, { $push: { posts: savedPost._id } }).exec();
        return savedPost;
    }
    async findAll() {
        return this.postModel
            .find()
            .populate('user', 'name email')
            .exec();
    }
    async findOne(id) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('Invalid ObjectId');
        }
        const post = await this.postModel
            .findById(id)
            .populate('user', 'name email')
            .exec();
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        return post;
    }
    async update(id, updatePostDto) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('Invalid ObjectId');
        }
        const post = await this.postModel.findByIdAndUpdate(id, updatePostDto, { returnDocument: 'after' }).exec();
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        return post;
    }
    async remove(id) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('Invalid ObjectId');
        }
        const post = await this.postModel.findByIdAndDelete(id).exec();
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        await this.userModel.findByIdAndUpdate(post.user, { $pull: { posts: id } }).exec();
        return post;
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PostsService);
//# sourceMappingURL=posts.service.js.map