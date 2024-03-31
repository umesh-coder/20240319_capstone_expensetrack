const express = require("express");
const router = express.Router();
const groupExpense = require("../controller/groupExpense")

router.put("/createExpense",groupExpense.createExpense)
router.get("/getExpenses",groupExpense.getExpenses)
router.put("/status",groupExpense.Status)
module.exports = router