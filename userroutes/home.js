const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {

    res.roles = "admin"

    res.json({ message: "coding e-commerce backend end-point" })


})

module.exports = router