"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./schema/product.schema");
const faker_1 = require("@faker-js/faker");
let ProductsService = class ProductsService {
    productModel;
    constructor(productModel) {
        this.productModel = productModel;
    }
    async onModuleInit() {
        const count = await this.productModel.countDocuments();
        if (count === 0) {
            console.log('Seeding 1000 products...');
            await this.seedProducts(1000);
            console.log('Products seeded successfully');
        }
    }
    async seedProducts(count) {
        const products = [];
        const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Toys'];
        for (let i = 0; i < count; i++) {
            products.push({
                name: faker_1.faker.commerce.productName(),
                description: faker_1.faker.commerce.productDescription(),
                price: parseFloat(faker_1.faker.commerce.price({ min: 10, max: 1000 })),
                category: categories[Math.floor(Math.random() * categories.length)],
                stock: Math.floor(Math.random() * 100) + 1,
            });
        }
        await this.productModel.insertMany(products);
    }
    create(createProductDto) {
        const product = new this.productModel(createProductDto);
        return product.save();
    }
    findAll() {
        return this.productModel.find().exec();
    }
    findOne(id) {
        return this.productModel.findById(id).exec();
    }
    update(id, updateProductDto) {
        return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
    }
    remove(id) {
        return this.productModel.findByIdAndDelete(id).exec();
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map