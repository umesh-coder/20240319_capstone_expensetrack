//external dependencies
const express = require("express");
const router = express.Router();

const group_controller = require('../controller/group')
const { ensureauth } = require("../middleware/middleware")

router.post("/creategroup", group_controller.createGroup)
router.put("/addmembers",group_controller.addMemberToGroup)

module.exports = router