import mongoose, { Types, Document } from 'mongoose';
export type PostDocument = Post & Document;
export declare class Post {
    title: string;
    content: string;
    user: Types.ObjectId;
}
export declare const PostSchema: mongoose.Schema<Post, mongoose.Model<Post, any, any, any, any, any, Post>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Post, mongoose.Document<unknown, {}, Post, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Post & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    title?: mongoose.SchemaDefinitionProperty<string, Post, mongoose.Document<unknown, {}, Post, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Post & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    content?: mongoose.SchemaDefinitionProperty<string, Post, mongoose.Document<unknown, {}, Post, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Post & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    user?: mongoose.SchemaDefinitionProperty<Types.ObjectId, Post, mongoose.Document<unknown, {}, Post, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Post & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Post>;
