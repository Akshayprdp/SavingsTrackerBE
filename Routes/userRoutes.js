const express =require("express")
const { signup,login,updateProfile } = require("../Controllers/userController")
const {addExpense,getExpenses,updateExpense,removeExpense,} = require("../Controllers/expenseController");
const {addSavingsGoal}=require("../Controllers/savingController")
const{addIncome,getIncomeByUserId}=require("../Controllers/incomeController")
const router = express.Router()



// signup routes
router.post("/signup",signup)
router.post('/login', login);
router.post('/signup',signup)
router.put('/updateProfile', updateProfile);

// expenses routes
router.post("/addExpense", addExpense);
router.get("/getExpenses/:userId", getExpenses);
router.put("/updateExpense/:userId/:expenseId", updateExpense);
// router.put("/updateExpense", updateExpense);

router.delete("/removeExpense/:userId/:expenseId", removeExpense);

// income routes
router.post("/addincome",addIncome)
router.get('/income/:userId', getIncomeByUserId);

// saving routes
router.post("/addsaving",addSavingsGoal)






module.exports=router

