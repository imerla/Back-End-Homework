"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
let ProductsService = class ProductsService {
    products = [
        {
            id: 1,
            title: 'Wireless Keyboard',
            description: 'Slim Bluetooth keyboard for laptops',
            price: 89.9,
            stock: 12,
            category: 'electronics',
        },
    ];
    nextId = 2;
    create(createProductDto) {
        const newProduct = {
            id: this.nextId++,
            ...createProductDto,
        };
        this.products.push(newProduct);
        return newProduct;
    }
    findAll() {
        return this.products;
    }
    findOne(id) {
        const product = this.products.find((el) => el.id === id);
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    update(id, updateProductDto) {
        const productIndex = this.products.findIndex((el) => el.id === id);
        if (productIndex === -1) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        this.products[productIndex] = {
            ...this.products[productIndex],
            ...updateProductDto,
        };
        return this.products[productIndex];
    }
    remove(id) {
        const productIndex = this.products.findIndex((el) => el.id === id);
        if (productIndex === -1) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        const deletedProduct = this.products[productIndex];
        this.products.splice(productIndex, 1);
        return deletedProduct;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map