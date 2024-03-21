
//interal dependencies
const CreateExpense = require("../models/createExpense");
const SaveData = require('../models/saveData');
const UserModel = require('../models/userModel');
const { checkparamsidwithheaderid } = require('../utils/checkparamsidwithheaderid')

//exports module
module.exports = {

    /**
     * @method createExpense
     * @param {*} req 
     * @param {*} res 
     * this method is used to create the expense
     */

    // POST endpoint to create a new expense
    createexpense: async (req, res) => {

        // Extract data from the request body
        const { name, amount, expense_date, expense_category, payment, comment, userid } = req.body;

        const id = userid
        const tempboolean = checkparamsidwithheaderid(req, res, id)

        if (tempboolean) {
            return res.status(401).json({ message: "User ID in token does not match user ID in headers1" });
        }

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

    /**
     * @method getallexpenses
     * @param {*} req 
     * @param {*} res 
     * @returns all  the expenses by id
     */

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

    /**
     * @method getsingleexpense
     * @param {*} req 
     * @param {*} res 
     * @returns return single expense
     */

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

    /**
     * @method update
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * update the exepense by id
     */

    updateexpense: async (req, res, next) => {
        try {

            const id = req.params.userId
            const tempboolean = checkparamsidwithheaderid(req, res, id)

            if (tempboolean) {
                return res.status(401).json({ message: "User ID in token does not match user ID in headers" });
            }


            console.log("body of update " + req.body.amount);

            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: req.params.userId, 'expenses._id': req.params.id },
                {
                    $set: {
                        'expenses.$.name': req.body.name,
                        'expenses.$.amount': req.body.amount,
                        'expenses.$.expense_date': req.body.expense_date,
                        'expenses.$.expense_category': req.body.expense_category,
                        'expenses.$.payment': req.body.payment,
                        'expenses.$.comment': req.body.comment
                    }
                },
                { new: true }//new:true ko false kiya
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

    /**
     * @method deleteexpense
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * delete the expense by id
     */

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

    /**
     * @method savedata
     * @param {*} req 
     * @param {*} res 
     * use to save user data
     */

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

    /**
     * @method getsavedata
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns user data
     */

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

    /**
     * @method updatesavedata
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * update savedata
     */

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

    /**
     * @method getcategory
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns all category by using user id
     */

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

    /**
     * @method savecategory
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * use to save the category
     */

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

    /**
     * @method updateprofile
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * update save data of profile data
     */

    updateprofile: async (req, res, next) => {
        const userId = req.params.id;
        const { username, name } = req.body;

        console.log("id:-" + userId);

        try {
            // Find and update the user profile
            const updatedUser = await UserModel.findOneAndUpdate(
                {  'userdata._id': userId },
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

    /**
     * @method updatename
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * update name and username of user data
     */

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
