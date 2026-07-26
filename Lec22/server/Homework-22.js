require("dotenv").config();
const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 3030
const connectToDB = require("./db/connectToDB")
app.use(cors())
app.use(express.json())
connectToDB()

app.get("/", (req, res) => {
    res.json("this is / request")
})

app.use("/users", require("./routes/user.router"))
app.use("/auth", require("./auth/auth.router"))
app.use("/expenses", require("./middleware/isAuth"), require("./routes/expenses.router"))

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})
