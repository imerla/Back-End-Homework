const express = require("express")
const productService = require("../services/product.service")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const result = await productService.getAllProducts(page, limit)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id)
        res.json(product)
    } catch (error) {
        if (error.message === "Product not found") {
            return res.status(404).json({ error: error.message })
        }
        res.status(500).json({ error: error.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const product = await productService.createProduct(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body)
        res.json(product)
    } catch (error) {
        if (error.message === "Product not found") {
            return res.status(404).json({ error: error.message })
        }
        if (error.message.includes("required")) {
            return res.status(400).json({ error: error.message })
        }
        res.status(500).json({ error: error.message })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const result = await productService.deleteProduct(req.params.id)
        res.json(result)
    } catch (error) {
        if (error.message === "Product not found") {
            return res.status(404).json({ error: error.message })
        }
        res.status(500).json({ error: error.message })
    }
})

module.exports = router
