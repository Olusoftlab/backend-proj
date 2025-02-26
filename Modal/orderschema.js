const mongoose = require("mongoose")
const mongooseConnection = mongoose.createConnection(process.env.DATABASE_URL, { dbName: "Orderdb" })

const orderSchema = new mongoose.Schema({

    userId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    ,

    productId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }

    ,
    orderstatus: {

        type: String,
        enum: ["pending", "assigned", "delivered"],
        default: "pending"
    }

    ,

    createdon: Date



})

module.exports = mongooseConnection.model("Order", orderSchema)