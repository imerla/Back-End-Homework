const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../products.json');

let products = [];
let nextId = 1;

const loadProducts = () => {
    if (fs.existsSync(DATA_FILE)) {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        products = data.products || [];
        nextId = data.nextId || 1;
    }
};

const saveProducts = () => {
    const data = { products, nextId };
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

loadProducts();

const createProduct = (productData) => {
    if (!productData.name || productData.name.trim() === '') {
        throw new Error('Product name is required');
    }
    if (productData.price === undefined || productData.price === null) {
        throw new Error('Product price is required');
    }
    if (!productData.category || productData.category.trim() === '') {
        throw new Error('Product category is required');
    }
    if (productData.isExpire === undefined || productData.isExpire === null) {
        throw new Error('Product isExpire is required');
    }

    const product = {
        id: nextId++,
        name: productData.name.trim(),
        price: productData.price,
        category: productData.category.trim(),
        isExpire: productData.isExpire
    };

    products.push(product);
    saveProducts();
    return product;
};

const getProductById = (id) => {
    const product = products.find(p => p.id === parseInt(id));
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
};

const getAllProducts = (page = 1, limit = 10) => {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const filteredProducts = products.filter(p => p.price <= 200);

    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
        products: paginatedProducts,
        currentPage: pageNum,
        totalPages: Math.ceil(filteredProducts.length / limitNum),
        totalProducts: filteredProducts.length
    };
};

const updateProduct = (id, updateData) => {
    const productIndex = products.findIndex(p => p.id === parseInt(id));
    
    if (productIndex === -1) {
        throw new Error('Product not found');
    }

    if (updateData.name !== undefined) {
        products[productIndex].name = updateData.name.trim();
    }
    if (updateData.price !== undefined) {
        products[productIndex].price = updateData.price;
    }
    if (updateData.category !== undefined) {
        products[productIndex].category = updateData.category;
    }
    if (updateData.isExpire !== undefined) {
        products[productIndex].isExpire = updateData.isExpire;
    }

    saveProducts();
    return products[productIndex];
};

const deleteProduct = (id) => {
    const productIndex = products.findIndex(p => p.id === parseInt(id));
    
    if (productIndex === -1) {
        throw new Error('Product not found');
    }

    const deletedProduct = products.splice(productIndex, 1)[0];
    saveProducts();
    return deletedProduct;
};

const getSecretInfo = () => {
    const totalProducts = products.length;
    const expensiveProducts = products.filter(p => p.price > 200).length;
    
    return {
        message: 'This is a secret route',
        totalProducts,
        expensiveProductsCount: expensiveProducts,
        note: 'Expensive products (price > 200) are hidden from regular GET /products endpoint'
    };
};

module.exports = {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getSecretInfo
};
