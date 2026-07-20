const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
        select: false
    },
    expenses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Expense",
        default: []
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("User", userSchema);