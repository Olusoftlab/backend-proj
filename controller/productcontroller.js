const product = require("../Modal/productschema")
const mongoose = require("mongoose")


let regProd


const addProduct = async (req, res) => {



    try {

        const { price, quantity, productnumber, createdOn } = req.body

        if (!price || !quantity || !productnumber || !createdOn) res.status(400).json({ message: "all fields are required" })


        await product.create({
            price,
            quantity,
            productnumber,
            createdOn
        })

        res.json({ message: "successfullt shopped product" })

    } catch (error) {


        console.log(error.message)

    }




}


const getProd = async (req, res) => {

    try {

        const logProd = await product.find()

        res.json(logProd)


    } catch (error) {
        console.error(error.message)
    }
}



const updateProd = async (req, res) => {

    try {

        const id = new mongoose.Types.ObjectId(req.params.id)



        const updateProd = await product.findByIdAndUpdate({ _id: id }, req.body, { new: true })

        if (!updateProd) res.status(404).json({ message: "product not found" })

        res.json(updateProd)

    } catch (error) {


        res.status(500).json({ message: error.message })


    }



}


const deleteProd = async (req, res) => {

    try {

        const id = new mongoose.Types.ObjectId(req.params.id)

        await product.findByIdAndDelete({ _id: id }) ?

            res.json({ message: `successfully deleted an entry with id ${id}` }) : res.json({ message: "product not found" })


    } catch (error) {

        res.status(500).json(error.message)


    }




}






module.exports = { addProduct, getProd, updateProd, deleteProd }