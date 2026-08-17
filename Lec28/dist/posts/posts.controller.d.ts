import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/post.schema").PostDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/post.schema").Post & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schema/post.schema").PostDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/post.schema").Post & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/post.schema").PostDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/post.schema").Post & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/post.schema").PostDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/post.schema").Post & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/post.schema").PostDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/post.schema").Post & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
