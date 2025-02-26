const user = require("../Modal/userschema")

//verifying index
const verifyIndex = async () => {

    try {

        const indexes = await user.collection.indexInformation()

        console.log("index verified")
        console.log(indexes)
    } catch (error) {
        console.error(error.message)
    }

}

module.exports = verifyIndex