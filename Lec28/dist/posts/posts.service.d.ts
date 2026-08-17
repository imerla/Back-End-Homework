import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schema/post.schema';
export declare class PostsService {
    private postModel;
    constructor(postModel: Model<PostDocument>);
    create(createPostDto: CreatePostDto, userId: string): Promise<import("mongoose").Document<unknown, {}, PostDocument, {}, import("mongoose").DefaultSchemaOptions> & Post & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, PostDocument, {}, import("mongoose").DefaultSchemaOptions> & Post & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, PostDocument, {}, import("mongoose").DefaultSchemaOptions> & Post & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<import("mongoose").Document<unknown, {}, PostDocument, {}, import("mongoose").DefaultSchemaOptions> & Post & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, PostDocument, {}, import("mongoose").DefaultSchemaOptions> & Post & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
