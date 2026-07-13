require("dotenv").config()
const express = require("express")
const connectToDB = require("./config/connectToMongoDB")
const productRoutes = require("./routes/product.routes")
const app = express()
const PORT = 3030

connectToDB()

app.use(express.json())

app.get("/", (req, res) => {
    res.json("Error Fixed!")
})

app.use("/products", productRoutes)


app.listen(PORT,() => {
    console.log(`server running on http://localhost:${PORT}`)
})