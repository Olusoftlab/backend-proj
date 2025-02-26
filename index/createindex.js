const user = require("../Modal/userschema")



const createIndex = async () => {


    try {

        await user.createIndexes()
        console.log("successfully created indexes")

    } catch (error) {

        console.error(error.message)
    }



}

module.exports = createIndex