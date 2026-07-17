const Product = require("../models/product.model")

class ProductService {
    async getAllProducts(page = 1, limit = 5) {
        const skip = (page - 1) * limit
        const products = await Product.find().skip(skip).limit(limit)
        const total = await Product.countDocuments()
        
        return {
            products,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        }
    }

    async getProductById(id) {
        const product = await Product.findById(id)
        if (!product) {
            throw new Error("Product not found")
        }
        return product
    }

    async createProduct(productData) {
        this.validateProductData(productData)
        const product = await Product.create(productData)
        return product
    }

    async updateProduct(id, productData) {
        this.validateRequiredFields(productData)
        
        const product = await Product.findByIdAndUpdate(
            id, 
            productData, 
            { new: true, runValidators: true }
        )
        
        if (!product) {
            throw new Error("Product not found")
        }
        return product
    }

    async deleteProduct(id) {
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            throw new Error("Product not found")
        }
        return { message: "Product deleted successfully" }
    }

    validateProductData(data) {
        if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
            throw new Error("Name is required and must be a non-empty string")
        }
        
        if (!data.price || typeof data.price !== 'number') {
            throw new Error("Price is required and must be a number")
        }
        
        if (data.price < 2 || data.price > 4000) {
            throw new Error("Price must be between 2 and 4000")
        }
        
        if (!data.category || typeof data.category !== 'string' || data.category.trim().length === 0) {
            throw new Error("Category is required and must be a non-empty string")
        }
    }

    validateRequiredFields(data) {
        if (!data.name || !data.price || !data.category) {
            throw new Error("name, price, and category are required")
        }
    }
}

module.exports = new ProductService()
