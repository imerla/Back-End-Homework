import { Document } from 'mongoose';
export type ProductDocument = Product & Document;
export declare class Product {
    title: string;
    description: string;
    price: number;
    stock: number;
    category: string;
}
export declare const ProductSchema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any, any, any, Product>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, Document<unknown, {}, Product, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    price?: import("mongoose").SchemaDefinitionProperty<number, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    stock?: import("mongoose").SchemaDefinitionProperty<number, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Product>;
