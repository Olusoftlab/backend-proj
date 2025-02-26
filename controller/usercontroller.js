const bcrypt = require("bcryptjs")
const user = require("../Modal/userschema")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")



///handle user sign up

const handleUserReg = async (req, res) => {

    try {

        const { firstname, lastname, email, password, roles } = req.body
        if (!firstname || !lastname || !email || !password) res.status(400).json({ message: "all fields are required" })

        const duplicate = await user.findOne({ firstname })

        if (duplicate) res.status(403).json({ message: "user already exist" })

        const hashPwd = await bcrypt.hash(password, 20)

        await user.create({
            firstname,
            lastname,
            email,
            password: hashPwd,
            roles
        })

        res.json({ message: "successfully registereed user" })



    } catch (error) {

        console.error(error.message)

    }

}


//handle user login

const handleUserLogin = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) res.status(400).json({ message: "All fields are reuired" })

    const foundUser = await user.findOne({ email })  // find user in database using email request 

    if (!foundUser) res.sendStatus(403) ///send an hhtp file forbidden user


    try {

        const comparePass = await bcrypt.compare(password, foundUser.password) /// client password authentication

        if (comparePass) {

            const accessToken = jwt.sign({ "username": foundUser.firstname },

                process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" }
            )


            foundUser.state = "logged in"
            await foundUser.save() // to confirm users that are current in login state in database

            res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 1 * 24 * 60 * 60 })





            res.json({ accessToken })

        }



    } catch (error) {

        res.status(500).json({ message: error.message })


    }



}








const getUser = async (req, res) => {

    const logUser = await user.find()

    res.json(logUser)

}


const updateUser = async (req, res) => {

    try {

        const id = new mongoose.Types.ObjectId(req.params.id)   // onverting req id to mongodb by calling ObjectId class

        const updateUser = await user.findByIdAndUpdate({ _id: id }, req.body, { new: true })

        if (!updateUser) res.status(404).json({ message: "user not found" })

        res.json(updateUser)


    } catch (error) {

        console.error(error.message)

    }



}


const deleteUser = async (req, res) => {

    try {


        const id = new mongoose.Types.ObjectId(req.params.id)


        await user.findByIdAndDelete({ _id: id }) ? res.json({ message: "successfully delted a user" }) : res.json({ message: "no user found" })



    } catch (error) {

        console.error(error.message)

    }


}








module.exports = { handleUserReg, getUser, handleUserLogin, updateUser, deleteUser }