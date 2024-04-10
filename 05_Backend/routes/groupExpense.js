const express = require("express");
const router = express.Router();
const groupExpense = require("../controller/groupExpense");
const { ensureauth } = require("../middleware/middleware")

router.put("/createExpense",ensureauth,groupExpense.createExpense)
router.get("/getExpenses",ensureauth,groupExpense.getExpenses)
router.get("/memberExpense",groupExpense.memberExpense)
router.put("/updateExpenseStatus",groupExpense.updateExpenseStatus)

module.exports = router
