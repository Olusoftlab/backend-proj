const jwt = require("jsonwebtoken")
const user = require("../Modal/userschema")


const handleAuth = (req, res, next) => {


    const authHeader = req.headers.authorization || req.headers.Authorization




    if (!authHeader) res.status(401).json({ message: "unauthorised" })

    const token = authHeader.split(" ")[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {

        const getUser = await user.findOne({ firstname: decoded.username }).exec()

        if (err || decoded.username !== getUser.firstname) {

            res.status(403).json({ message: "forbidden" })  //ascertain usercredentials

        } else {

            jwt.sign({ "username": decoded.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "3d" })

            next()

        }

    })

}


module.exports = handleAuth