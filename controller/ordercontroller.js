const user = require("../Modal/orderschema")
const mongoose = require("mongoose")


const postOrder = async (req, res) => {

    const { userId, productId, orderstatus, createdon } = req.body

    try {

        if (!userId || !productId || !orderstatus || !createdon) res.status(400).json({ message: "all fields are required" })

        await user.create({

            userId,
            productId,
            orderstatus,
            createdon
        })

        res.status(201).json({ message: "successfully made an order" })


    } catch (error) {

        console.error(error.message)


    }


}


const getOrder = async (req, res) => {

    try {

        const logOrder = await user.find()

        res.json(logOrder)

    } catch (error) {

        console.error(error.message)
    }


}



const updateOrder = async (req, res) => {


    try {

        const id = new mongoose.Types.ObjectId(req.params.id)  //getting params id as valid mongodb id by calling ObjectId 

        const updateOrder = await user.findByIdAndUpdate({ _id: id }, req.body, { new: true })

        if (!updateOrder) res.status(404).json({ message: "order not found" }) //handling nullity updateOrder

        res.json(updateOrder)




    } catch (error) {


        res.status(500).json({ message: error.message })


    }



}


const deleteOrder = async (req, res) => {

    try {

        const id = new mongoose.Types.ObjectId(req.params.id)  // getting params id as valid mongoose id by calling ObjectId class

        await user.findByIdAndDelete({ _id: id }) ? res.json({ message: "Successfully deleted an entry" }) :
            res.json({ message: "Entry not found" })

    } catch (error) {

        res.status(500).json({ message: error.message })

    }


}



module.exports = { postOrder, getOrder, updateOrder, deleteOrder }