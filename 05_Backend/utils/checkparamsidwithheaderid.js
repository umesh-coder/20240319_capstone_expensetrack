const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const checkparamsidwithheaderid =  (req, res, id) => {
    const token = req.headers["authorization"];
    try {
        const decoded = jwt.verify(req.headers["authorization"].split(' ')[1], process.env.JWT_KEY);

        // console.log("id test1:-" + decoded.userId);
        // console.log("id test2:-" + id.toString());

        // If user is not found or user ID does not match, return 403
        if (id.toString() !== decoded.userId.toString()) {
            console.log("wrong user");
            return true
        }else{

            return false
        }

   
    } catch (error) {
        console.error(error);
      
    }
};

module.exports = {
    checkparamsidwithheaderid
};
