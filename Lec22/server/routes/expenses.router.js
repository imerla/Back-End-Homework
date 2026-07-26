const {Router} = require("express")
const ExpenseModel = require("../models/expense.model")
const {isValidObjectId} = require("mongoose")

const expensesRouter = Router()

expensesRouter.get("/", async (req, res) => {
    try {
        const findAllExpenses = await ExpenseModel.find()
        res.json({message: "this is /expenses request", data: findAllExpenses})
    } catch (error) {
        res.status(500).json({message: error.message, data: null})
    }
})

expensesRouter.get("/:id", async (req, res) => {
    try {
        const {id} = req.params
        if (!isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid ID", data: null})
        }
        const expense = await ExpenseModel.findById(id)
        if (!expense) {
            return res.status(404).json({message: "Expense not found", data: null})
        }
        res.json({message: "expense found", data: expense})
    } catch (error) {
        res.status(500).json({message: error.message, data: null})
    }
})

expensesRouter.post("/", async (req, res) => {
    try {
        const {title, amount, category, user} = req.body
        if (!title || !amount || !category || !user) {
            return res.status(400).json({message: "title, amount, category, and user are required", data: null})
        }
        const newExpense = await ExpenseModel.create({title, amount, category, user})
        res.status(201).json({message: "Expense created successfully", data: newExpense})
    } catch (error) {
        res.status(500).json({message: error.message, data: null})
    }
})

expensesRouter.put("/:id", async (req, res) => {
    try {
        const {id} = req.params
        if (!isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid ID", data: null})
        }
        const {title, amount, category} = req.body
        const updatedExpense = await ExpenseModel.findByIdAndUpdate(id, {title, amount, category}, {new: true, runValidators: true})
        if (!updatedExpense) {
            return res.status(404).json({message: "Expense not found", data: null})
        }
        res.json({message: "Expense updated successfully", data: updatedExpense})
    } catch (error) {
        res.status(500).json({message: error.message, data: null})
    }
})

expensesRouter.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params
        if (!isValidObjectId(id)) {
            return res.status(400).json({message: "Invalid ID", data: null})
        }
        const deletedExpense = await ExpenseModel.findByIdAndDelete(id)
        if (!deletedExpense) {
            return res.status(404).json({message: "Expense not found", data: null})
        }
        res.json({message: "Expense deleted successfully", data: deletedExpense})
    } catch (error) {
        res.status(500).json({message: error.message, data: null})
    }
})

module.exports = expensesRouter
