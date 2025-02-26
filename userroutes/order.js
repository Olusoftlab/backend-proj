const express = require("express")
const router = express.Router()

const { getOrder, postOrder, updateOrder, deleteOrder, par } = require("../controller/ordercontroller")


router.post("/", postOrder)
router.get("/", getOrder)
router.put("/:id", updateOrder)
router.delete("/:id", deleteOrder)

module.exports = router
