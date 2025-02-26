require("dotenv").config()
const express = require("express")
const app = express()
const connectDb = require("./config/userdatabase")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const rateLimiter = require("./config/ratelimiter")
const home = require("./userroutes/home")
const user = require("./userroutes/user")
const userLogin = require("./userroutes/userlogin")
const userProd = require("./userroutes/product")
const userOrder = require("./userroutes/order")
const handleAuth = require("./middleware/authmiddleware")
const getUserRole = require("./middleware/generalware")



app.use(rateLimiter)
app.use(cookieParser())
app.use(express.json())


connectDb()

const PORT = process.env.PORT || 2500


app.use("/", home)

app.use(getUserRole)  //this is a middleware to get users logged in as admin

app.use("/user", user)
app.use("/login", userLogin)

// middleware for authentication 

app.use(handleAuth)


app.use("/prod", userProd)
app.use("/order", userOrder)








mongoose.connection.once("open", (err) => {

    if (err) {

        console.log(err.message)
    }

    console.log("successfully connected to database")



    app.listen(PORT, () => {

        console.log(`serving running on port ${PORT}`)

    })


})






