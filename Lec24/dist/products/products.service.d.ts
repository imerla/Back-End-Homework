export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}
interface GetAllOptions {
    id?: number;
    name?: string;
    description?: string;
    price?: number;
}
export declare class ProductsService {
    private products;
    private nextId;
    getAll(options: GetAllOptions): Product[];
    getById(id: number): Product;
    create(product: Omit<Product, 'id'>): Product;
    update(id: number, product: Partial<Omit<Product, 'id'>>): Product;
    delete(id: number, password: string): void;
}
export {};
