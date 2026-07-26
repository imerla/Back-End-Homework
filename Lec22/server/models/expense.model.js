const { default: mongoose } = require("mongoose");

const expensesSchema = new mongoose.Schema({
    title:{
        type: String
    },
    amount:{
        type: Number
    },
    category:{
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
}
)  

module.exports = mongoose.model("Expense", expensesSchema);
