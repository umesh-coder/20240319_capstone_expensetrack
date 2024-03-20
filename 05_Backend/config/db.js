
//external Dependencies
const mongoose = require("mongoose");
const url = process.env.MONGO_URL;


//Connecting Database
mongoose
    .connect(url)
    .then(() => {
        console.log("🚀 Mongo Database is Connected Sucessfully..... 🚀");
    })
    .catch((err) => {
        console.log(" 🥺 Mongo Database is Not 🥺 | Connected ERROR:-" + err);
    });
