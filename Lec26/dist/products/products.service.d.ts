import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductsService {
    private products;
    private nextId;
    create(createProductDto: CreateProductDto): Product;
    findAll(): Product[];
    findOne(id: number): Product;
    update(id: number, updateProductDto: UpdateProductDto): Product;
    remove(id: number): Product;
}
