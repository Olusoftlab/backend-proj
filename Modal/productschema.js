const mongoose = require("mongoose")
const mongooseConnection = mongoose.createConnection(process.env.DATABASE_URL, { dbName: "Productdb" })

const productSchema = new mongoose.Schema({

    price: {

        type: Number,
        required: true
    }
    ,

    quantity: {

        type: Number,
        required: true

    }

    ,

    productnumber: {

        type: Number,
        required: true,
        unique: true
    }

    ,

    createdOn: Date


})

module.exports = mongooseConnection.model("Product", productSchema)