import { ProductsService, Product } from './products.service';
import { CreateProductDto, UpdateProductDto } from '../DTO/products.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getAll(id?: string, name?: string, description?: string, price?: string): Product[];
    getById(id: number): Product;
    create(createProductDto: CreateProductDto): Product;
    update(id: number, updateProductDto: UpdateProductDto): Product;
    delete(id: number, password: string): {
        message: string;
    };
}
