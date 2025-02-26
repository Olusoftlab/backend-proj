// const verifyRole = (role) => {


//     return (req, res, next) => {

//         if (role === "admin") {
//             const myHeader = req.headers["role-header"]
//             console.log(myHeader)
//             next()

//         } else {

//             res.status(401).json({ message: "unauthorised" })

//         }

//     }

// }


// module.exports = verifyRole
const user = require("../Modal/userschema")

const verifyRole = (req, res, next) => {

    const info = req.roles

    if (info === "admin") {

        next()

    } else (

        res.status(401).json({ message: "unauthorized" })

    )


}

module.exports = verifyRole