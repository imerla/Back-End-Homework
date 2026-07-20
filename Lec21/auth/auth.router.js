const {Router} = require("express")
const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const authRouter = Router()

authRouter.post("/sign-up", async (req, res) => {
    const {fullName, email, password} = req.body
    
    if (!fullName || !email || !password) {
        return res.status(400).json({message: "fullName, email, and password are required", data: null})
    }

    const existingUser = await userModel.findOne({email})
    if (existingUser) {
        return res.status(400).json({message: "User already exists", data: null})
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await userModel.create({fullName, email, password: hashPassword})
    res.status(201).json({message: "User signed up successfully", data: newUser})
})


authRouter.post("/sign-in", async (req, res) => {
    const {email, password} = req.body
    
    if (!email || !password) {
        return res.status(400).json({message: "email and password are required", data: null})
    }

    const user = await userModel.findOne({email}).select('+password')
    if (!user) {
        return res.status(400).json({message: "User not found", data: null})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(400).json({message: "Invalid information", data: null})
    }

    const payload = {
        userId : user._id
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})
    
    const userWithoutPassword = user.toObject()
    delete userWithoutPassword.password
    res.status(200).json({message: "User signed in successfully", data: userWithoutPassword, token})
})

module.exports = authRouter