const express = require("express")
const router = express.Router()
const { addProduct, getProd, updateProd, deleteProd } = require("../controller/productcontroller")


router.post("/", addProduct)

router.get("/", getProd)

router.put("/:id", updateProd)

router.delete("/:id", deleteProd)

module.exports = router