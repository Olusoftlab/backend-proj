const express = require("express")
const router = express.Router()
const { handleUserReg, getUser, updateUser, deleteUser } = require("../controller/usercontroller")
const verifyRole = require("../middleware/verifyroles")



router.get("/", verifyRole, getUser)    //middleware implemented for all admin to get all registered users

router.post("/", handleUserReg)

router.put("/:id", verifyRole, updateUser)  //middleware implemented for all admin to update users

router.delete("/:id", verifyRole, deleteUser)    // middleware implemeted for all admin to delete users

module.exports = router