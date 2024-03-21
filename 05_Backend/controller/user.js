

//External Dependencies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//Internal Dependencies
const UserModel = require("../models/userModel");
const { checkparamsidwithheaderid } = require('../utils/checkparamsidwithheaderid')


//exports module
module.exports = {
    
    /**
  * @method signup
  * @param {*} req 
  * @param {*} res 
  * @returns User Creation & error if found
  * signup User POST Method to Create New User
  * validation of data is done
  */

    signup: async (req, res, next) => {

        try {
            // Hash the password before saving it to the database
            const hash = await bcrypt.hash(req.body.password, 10);

            // Create a new user object
            const newUser = new UserModel({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: hash,
                userfirstsignupdate: req.body.userfirstsignupdate,
                category: req.body.category,
            });

            // Save the user to the database
            const savedUser = await newUser.save();

            // Generate JWT token for authentication
            const token = jwt.sign(
                { email: savedUser.email },
                process.env.JWT_KEY,
                { expiresIn: '1h' } // Token expires in 1 hour
            );

            // Respond with success message and token
            res.status(201).json({
                message: 'User created successfully',
                token: token,
                userId: savedUser._id
            });

        } catch (error) {
            // Handle errors
            console.error(error);
            res.status(500).json({
                message: 'Failed to create user',
                error: error.message
            });
        }
    },

    /**
   * @method login
   * @param {*} req 
   * @param {*} res 
   * @returns user information is Valid & Token Creation & error if found
   * generate Token & Auth The User
   */

    login: async (req, res, next) => {
        try {
            // Find the user in the database by their email
            const user = await UserModel.findOne({ email: req.body.email });

            // If the user is not found, return an error
            if (!user) {
                return res.status(401).json({
                    message: "Invalid Email Address",
                    status: false,
                });
            }

            // Compare the provided password with the stored hashed password
            const validate = await bcrypt.compare(req.body.password, user.password);

            // If the password is not valid, return an error
            if (!validate) {
                return res.status(401).json({
                    message: "Invalid Email Address or Password",
                    status: false,
                });
            }

            // Generate JWT token for authentication
            const token = jwt.sign(
                { email: user.email, userId: user._id },
                process.env.JWT_KEY,
                { expiresIn: '1h' } // Token expires in 1 hour
            );

            // Respond with success message, token, and user ID
            res.status(200).json({
                message: "Login Successfully!",
                data: {
                    token: token,
                    latestLoginDate: new Date(),
                    userId: user._id,
                    expiredToken: 3600,
                },
                status: true,
            });
        } catch (error) {
            // Handle errors
            console.error(error);
            res.status(500).json({
                message: "Something went wrong! Please try again",
                status: false,
            });
        }
    },

    /**
  * @method deleteaccount
  * @param {*} req 
  * @param {*} res 
  * @returns delete the Account if user is authorize
  */

    deleteaccount: async (req, res, next) => {
        try {

            const id = req.params.id
            const tempboolean = checkparamsidwithheaderid(req, res, id)

            if (tempboolean) {
                return res.status(401).json({ message: "User ID in token does not match user ID in headers1" });
            }

            // Find the user in the database by their ID and delete them
            const result = await UserModel.findOneAndDelete({ _id: req.params.id });

            // If the user is not found, return an error
            if (!result) {
                return res.status(404).json({
                    message: "User not found",
                    status: false,
                });
            }

            // Respond with success message
            res.status(200).json({
                message: "Successfully deleted account",
                status: true,
            });

        } catch (error) {
            // Handle errors
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error",
                status: false,
            });
        }
    }

}