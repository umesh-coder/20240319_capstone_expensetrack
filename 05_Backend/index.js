//external dependecies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const user = require("./routes/user");
const expense= require("./routes/expense")


//internal dependecies
require("dotenv").config();
require("./config/db");



//importing Port
const Port = process.env.Port || 2000;

//import the routes
app.use(bodyParser.json());
app.use("/auth", user);
app.use("/expense",expense)


//server listening on Port 
app.listen(Port, () => {
    console.log("🚀 Server is running 🚀 On Port:- " + Port);
   
});