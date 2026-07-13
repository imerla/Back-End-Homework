const { default: mongoose } = require("mongoose");

async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
    }catch (error){
        console.log(error, "Error comes from config, in particular problem with connecting to MongoDB");
    }
}

module.exports = connectToDB