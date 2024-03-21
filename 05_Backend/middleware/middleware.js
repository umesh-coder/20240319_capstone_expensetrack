const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");


/**
 * @method ensureauth
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns that User is Authorized or Not
 */

const ensureauth = async (req, res, next) => {
    console.log("hello");
    const token = req.headers["authorization"];
    console.log("token:" + token);
    if (!token) {
        return res.status(403).json({ message: "Token is Required" });
    }



    try {
        const decoded = jwt.verify(
            req.headers["authorization"].split(' ')[1],
            process.env.JWT_KEY
        );

        //display user id
        // console.log("id:-" + decoded.userId);

        // Find the user based on the email extracted from the decoded token
        const user = await UserModel.findOne({ email: decoded.email });


        // console.log("id2:-" + user._id);

        // If user is not found or user ID does not match, return 403
        if (!user || (user._id).toString() !== (decoded.userId).toString()) {
            return res.status(403).json({ message: "User ID in token does not match user ID in headers" });
        }

        return next();
    } catch (error) {
        return res.status(403).json({ message: "Token is Not Valid or Expired" });
    }
};


module.exports = {
    ensureauth
};
