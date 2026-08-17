import mongoose from 'mongoose';
export type PostDocument = Post & Document;
export declare class Post {
    title: string;
    content: string;
    user: mongoose.Schema.Types.ObjectId;
}
export declare const PostSchema: mongoose.Schema<Post, mongoose.Model<Post, any, any, any, any, any, Post>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Post, mongoose.Document<unknown, {}, Post, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Post & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    title?: mongoose.SchemaDefinitionProperty<string, Post, mongoose.Document<unknown, {}, Post, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Post & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    content?: mongoose.SchemaDefinitionProperty<string, Post, mongoose.Document<unknown, {}, Post, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Post & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    user?: mongoose.SchemaDefinitionProperty<mongoose.Schema.Types.ObjectId, Post, mongoose.Document<unknown, {}, Post, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Post & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Post>;
