const express = require("express");
const router = express.Router();
const groupExpense = require("../controller/groupExpense");
const { ensureauth } = require("../middleware/middleware")

router.put("/createExpense",ensureauth,groupExpense.createExpense)
router.get("/getExpenses",ensureauth,groupExpense.getExpenses)
router.get("/memberExpense",ensureauth,groupExpense.memberExpense)
router.put("/updateStatus",ensureauth,groupExpense.updateStatus)
router.get("/getMembers",groupExpense.getMembers)
router.get("/convert",groupExpense.convert)
router.get("/getObjectIdByEmail",groupExpense.getObjectIdByEmail)
router.get("/getEmailById",groupExpense.getEmailById)
module.exports = router
