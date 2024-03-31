const express = require("express");
const router = express.Router();
const groupExpense = require("../controller/groupExpense")

router.put("/createExpense",groupExpense.createExpense)
router.get("/getExpenses",groupExpense.getExpenses)
router.get("/memberExpense",groupExpense.memberExpense)
router.put("/updateExpenseStatus",groupExpense.updateExpenseStatus)

module.exports = router
