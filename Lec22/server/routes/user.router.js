const {Router} = require("express");
const userModel = require("../models/user.model");
const {isValidObjectId} = require("mongoose")

const userRouter = Router();

userRouter.get("/", async (req, res) => {
    const findAllUser = await userModel.find()
    res.json({message: "you have reached /users endpoint", data: findAllUser})
})

userRouter.get("/:id", async (req, res) => {
    const {id} = req.params
    if (!isValidObjectId(id)) {
        return res.status(400).json({message: "Invalid ID", data: null})
    }
    const findUserById = await userModel.findById(id)

    if(!findUserById){
        return res.status(404).json({message: "User not found", data: null})
    }

    res.json({message: "user found", data: findUserById})
})

userRouter.delete("/:id", async (req, res) => {
    const {id} = req.params
    if (!isValidObjectId(id)) {
        return res.status(400).json({message: "Invalid ID", data: null})
    }
    const deletedUser = await userModel.findByIdAndDelete(id)

    if(!deletedUser){
        return res.status(404).json({message: "User not found", data: null})
    }

    res.json({message: "User deleted successfully", data: deletedUser})
})

userRouter.put("/:id", async (req, res) => {
    const {id} = req.params
    const {fullName, email, password} = req.body
    
    if (!isValidObjectId(id)) {
        return res.status(400).json({message: "Invalid ID", data: null})
    }
    
    const updatedUser = await userModel.findByIdAndUpdate(id, {fullName, email, password}, {new: true, runValidators: true})

    if(!updatedUser){
        return res.status(404).json({message: "User not found", data: null})
    }

    res.json({message: "User updated successfully", data: updatedUser})
})

module.exports = userRouter;