require("dotenv").config()
const express = require("express")
const connectToDB = require("./config/connectToMongoDB")
const productRoutes = require("./routes/product.routes")
const app = express()
const PORT = process.env.PORT || 3030

connectToDB()

app.use(express.json())

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Product API" })
})

app.use("/products", productRoutes)


app.listen(PORT,() => {
    console.log(`server running on http://localhost:${PORT}`)
})