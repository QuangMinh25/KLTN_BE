const mongoose = require("mongoose")
const MONGO_URI = "mongodb+srv://root:sapassword@cluster0.ajyuk.mongodb.net/DSVN?retryWrites=true&w=majority"
const connectDB = async() => {
    const conn = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    console.log(`MongoDB Connected`)
}
module.exports = connectDB