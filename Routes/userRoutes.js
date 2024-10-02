const express =require("express")
const { signup,login,updateProfile } = require("../Controllers/userController")
const router = express.Router()




router.post("/signup",signup)
router.post('/login', login);
router.post('/signup',signup)
router.put('/updateProfile', updateProfile);


module.exports=router

