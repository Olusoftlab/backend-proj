const express = require("express")
const router = express.Router()
const { handleUserLogin } = require("../controller/usercontroller")


router.post("/", handleUserLogin)



module.exports = router

