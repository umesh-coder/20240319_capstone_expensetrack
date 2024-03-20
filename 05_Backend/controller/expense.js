

//External Dependencies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//interal dependencies
const CreateExpense = require("../models/createExpense");
const SaveData = require('../models/saveData');
const UserModel = require('../models/userModel');
const { checkparamsidwithheaderid } = require('../utils/checkparamsidwithheaderid')

//exports module
module.exports = {

    // POST endpoint to create a new expense
    createexpense: async (req, res) => {

        // Extract data from the request body
        const { name, amount, expense_date, expense_category, payment, comment, userid } = req.body;

        // Create a new expense instance
        const newExpense = new CreateExpense({
            name,
            amount,
            expense_date,
            expense_category,
            payment,
            comment,
            userid
        });

        UserModel.updateOne({ _id: userid }, {
            $push: { expenses: newExpense }
        }).then((result) => {
            res.status(200).json({
                message: 'Expense Added',
                status: true,
            })
            console.log(result);
        }).catch((err) => {
            res.status(501).json({
                message: err,
                status: false,
            });
        });
    },

    getallexpenses: async (req, res) => {
        try {
            const id = req.params.id
            const tempboolean = checkparamsidwithheaderid(req, res, id)

            if (tempboolean) {
                return res.status(401).json({ message: "User ID in token does not match user ID in headers1" });
            }


            const user = await UserModel.findOne({ _id: req.params.id });
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                    status: false,
                });
            }
            res.status(200).json({
                message: "Successfully Fetched",
                data: user.expenses,
                status: true,
            });
        } catch (err) {
            res.status(500).json({
                message: err.message || "Internal Server Error",
                status: false,
            });
        }
    },

    getsingleexpense: async (req, res) => {
        try {

            const id = req.params.userId
            const tempboolean = checkparamsidwithheaderid(req, res, id)

            if (tempboolean) {
                return res.status(401).json({ message: "User ID in token does not match user ID in headers1" });
            }

            const user = await UserModel.findOne({ _id: req.params.userId, 'expenses._id': req.params.id }, { 'expenses.$': 1 });

            if (!user) {
                return res.status(404).json({
                    message: "User or expense not found",
                    status: false,
                });
            }

            res.status(200).json({
                message: 'Fetch one',
                data: user.expenses[0],
                status: true,
            });
        } catch (err) {
            res.status(500).json({
                message: err.message || "Internal Server Error",
                status: false,
            });
        }
    },

    updateexpense: async (req, res, next) => {
        try {

            const id = req.params.userId
            const tempboolean = checkparamsidwithheaderid(req, res, id)

            if (tempboolean) {
                return res.status(401).json({ message: "User ID in token does not match user ID in headers1" });
            }

            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: req.params.userId, 'expenses._id': req.params.id },
                { $set: { 'expenses.$': req.body } },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({
                    message: "User or expense not found",
                    status: false,
                });
            }

            console.log(updatedUser);
            res.status(200).json({
                message: "Successfully Updated",
                status: true,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message || "Internal Server Error",
                status: false,
            });
        }
    },

    deleteexpense: async (req, res, next) => {
        try {

            const id = req.params.userId
            const tempboolean = checkparamsidwithheaderid(req, res, id)

            if (tempboolean) {
                return res.status(401).json({ message: "User ID in token does not match user ID in headers1" });
            }

            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { expenses: { _id: req.params.id } } },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({
                    message: "User not found",
                    status: false,
                });
            }

            console.log(updatedUser);
            res.status(200).json({
                message: "Expense deleted successfully",
                status: true,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message || "Internal Server Error",
                status: false,
            });
        }
    },

    //POST endpoint to crate user login data

    savedata: async (req, res) => {

        // Extract data from the request body
        const { username, name, firstlogindate, lastlogindate, expenselogged, userid } = req.body;

        // Create a new instance of SaveData model
        const newData = new SaveData({
            username,
            name,
            firstlogindate,
            lastlogindate,
            expenselogged,
            userid
        });

        UserModel.updateOne({ _id: userid }, {
            $push: { userdata: newData }
        }).then((result) => {
            res.status(200).json({
                message: 'User Data Added',
                status: true,
            })
            console.log(result);
        }).catch((err) => {
            res.status(501).json({
                message: err,
                status: false,
            });
        });


    },

    getsavedata: async (req, res, next) => {
        try {
            console.log(req.params.id);
            const user = await UserModel.findOne({ _id: req.params.id });
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                    status: false,
                });
            }
            res.status(200).json({
                message: 'Fetch one',
                data: user.userdata[0],
                status: true,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: err.message || "Internal Server Error",
                status: false,
            });
        }
    },


    updatesavedata: async (req, res, next) => {
        try {
            const result = await UserModel.findOneAndUpdate(
                { _id: req.params.id, 'userdata.userid': req.params.id },
                {
                    $set: {
                        'userdata.$.lastlogindate': req.body.lastlogindate,
                        'userdata.$.expenselogged': req.body.expenselogged,
                    }
                },
                { new: true }
            );

            if (!result) {
                return res.status(404).json({
                    message: "User data not found",
                    status: false,
                });
            }

            res.status(200).json({
                message: "Successfully updated login date and expense logged",
                status: true,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message || "Internal Server Error",
                status: false,
            });
        }
    },

    getcategory: async (req, res, next) => {
        try {
            const user = await UserModel.findOne({ _id: req.params.id });
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                    status: false,
                });
            }
            res.status(200).json({
                message: 'Fetch All Category',
                data: user.category,
                status: true,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: err.message || "Internal Server Error",
                status: false,
            });
        }
    },

    savecategory: async (req, res, next) => {
        const userId = req.params.id;
        const categories = req.body.categories;

        try {
            // Update the user document to push new categories
            const result = await UserModel.updateOne(
                { _id: userId },
                { $push: { category: { $each: categories } } }
            );

            // Check if the update was successful
            if (result.nModified === 0) {
                return res.status(404).json({
                    message: "User not found or no categories added",
                    status: false,
                });
            }

            // Respond with success message
            res.status(200).json({
                message: 'Categories added successfully',
                status: true,
            });
        } catch (error) {
            // Handle errors
            console.error(error);
            res.status(500).json({
                message: error.message || "Internal Server Error",
                status: false,
            });
        }
    },

    updateprofile: async (req, res, next) => {
        const userId = req.params.id;
        const { username, name } = req.body;

        console.log("id"+userId);

        try {
            // Find and update the user profile
            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: userId, 'userdata.userid': userId },
                {
                    $set: {
                        'userdata.$.username': username,
                        'userdata.$.name': name
                    }
                },
                { new: true }
            );

            // Check if user profile was successfully updated
            if (!updatedUser) {
                return res.status(404).json({
                    message: "User profile not found or not updated",
                    status: false,
                });
            }

            // Respond with success message
            res.status(200).json({
                message: "Successfully updated profile information",
                status: true,
            });
        } catch (error) {
            // Handle errors
            console.error(error);
            res.status(500).json({
                message: error.message || "Internal Server Error",
                status: false,
            });
        }
    },

    updatename: async (req, res, next) => {
        const userId = req.params.id;
        const { name, username } = req.body;

        try {
            // Find and update the user's name and username
            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: userId },
                { name, username },
                { new: true }
            );

            // Check if user was found and updated
            if (!updatedUser) {
                return res.status(404).json({
                    message: "User not found or not updated",
                    status: false,
                });
            }

            // Respond with success message
            res.status(200).json({
                message: "Successfully updated user information",
                status: true,
            });
        } catch (error) {
            // Handle errors
            console.error(error);
            res.status(500).json({
                message: error.message || "Internal Server Error",
                status: false,
            });
        }
    },



}
