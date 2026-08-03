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
        { id: 1, name: 'milk', description: 'Fresh milk', price: 4 },
        { id: 2, name: 'bread', description: 'White bread', price: 2 },
        { id: 3, name: 'cheese', description: 'Cheddar cheese', price: 8 },
        { id: 4, name: 'butter', description: 'Butter 200g', price: 5 },
        { id: 5, name: 'eggs', description: 'Eggs 10pcs', price: 6 },
    ];
    nextId = 6;
    getAll(options) {
        let filtered = [...this.products];
        if (options.id !== undefined) {
            filtered = filtered.filter(el => el.id === options.id);
        }
        if (options.name) {
            filtered = filtered.filter(el => el.name === options.name);
        }
        if (options.description) {
            filtered = filtered.filter(el => el.description === options.description);
        }
        if (options.price !== undefined) {
            filtered = filtered.filter(el => el.price === options.price);
        }
        return filtered;
    }
    getById(id) {
        const product = this.products.find(el => el.id === id);
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }
    create(product) {
        const newProduct = {
            id: this.nextId++,
            ...product,
        };
        this.products.push(newProduct);
        return newProduct;
    }
    update(id, product) {
        const index = this.products.findIndex(el => el.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        this.products[index] = { ...this.products[index], ...product };
        return this.products[index];
    }
    delete(id, password) {
        const index = this.products.findIndex(el => el.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        if (password !== 'secret') {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        this.products.splice(index, 1);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map