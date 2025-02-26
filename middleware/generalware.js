const user = require("../Modal/userschema")



const getUserRole = async (req, res, next) => {

    const getAllUser = await user.find()

    const allRoles = getAllUser.map(item => item.roles)

    const getRole = allRoles.includes("admin") ? "admin" : "user"

    req.roles = getRole

    next()

}

module.exports = getUserRole