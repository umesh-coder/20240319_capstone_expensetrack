//external dependencies
const express = require("express");
const routes = express.Router();

//internal dependencies
const { signup, login, deleteaccount } = require("../controller/user")
const {createexpense} = require("../controller/expense")
const { ensureauth } = require("../middleware/middleware")


//signup Route
routes.post("/signup", signup);

//login Route
routes.post("/login", login)

//delete account route
routes.delete("/delete/:id", ensureauth, deleteaccount)




//exporting Route
module.exports = routes;
