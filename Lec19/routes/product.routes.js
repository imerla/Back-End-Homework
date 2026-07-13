const express = require("express")
const Product = require("../models/product.model")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const skip = (page - 1) * limit

        const products = await Product.find().skip(skip).limit(limit)
        const total = await Product.countDocuments()

        res.json({
            products,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ error: "Product not found" })
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const { name, price, category } = req.body
        
        if (!name || !price || !category) {
            return res.status(400).json({ error: "name, price, and category are required" })
        }
        
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!product) {
            return res.status(404).json({ error: "Product not found" })
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            return res.status(404).json({ error: "Product not found" })
        }
        res.json({ message: "Product deleted successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router
