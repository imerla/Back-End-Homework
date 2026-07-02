const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getSecretInfo
} = require('./products.services');
const isAdmin = require('../../Middlewares/isAdmin');
const isEditor = require('../../Middlewares/isEditor');

router.post('/', (req, res) => {
    try {
        const product = createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const result = getAllProducts(page, limit);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/secret', (req, res) => {
    try {
        const secretInfo = getSecretInfo();
        res.json(secretInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', (req, res) => {
    try {
        const product = getProductById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.put('/:id', isEditor, (req, res) => {
    try {
        const updatedProduct = updateProduct(req.params.id, req.body);
        res.json(updatedProduct);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.delete('/:id', isAdmin, (req, res) => {
    try {
        const deletedProduct = deleteProduct(req.params.id);
        res.json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;
