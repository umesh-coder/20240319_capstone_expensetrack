//interal dependencies
const UserModel = require('../models/userModel');
const groupModel = require('../models/groupModel')
const expenses = require("../models/createExpense")
/*
{
    "name": "Groceries",
    "amount": 80,
    "expense_date": "2022-03-30",
    "expense_category": "Food",
    "payment": "Credit Card",
    "comment": "Weekly grocery shopping",
    "split_members": [
      {"member_id": "60f6de8066b1c12288a86328", "shareamount": 40,"status": "Pending",},
      {"member_id": "60f6de8066b1c12288a8632a", "shareamount": 40,"status": "Pending",}
    ],
  }
  */

/**
 * Create a new expense and add it to a group.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} JSON response indicating success or failure.
 */
const createExpense = async (req, res) => {
    try {
        const userData = req.decoded;
        const userId = userData.userId;

        // Extract expense details from the request body
        const { name, amount, expense_date, expense_category, payment, comment, split_members } = req.body;

        // Extract groupId from the request query
        const { groupId } = req.query;

        // Check if the group exists
        const group = await groupModel.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Check if the user is a member of the group or the creator of the group
        const isGroupMember = group.members.includes(userId);
        console.log("Check group mem " + isGroupMember)
        const isGroupCreator = group.groupcreatedby.toString() === userId;
        if (isGroupMember) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        // Create a new expense object
        const newExpense = {
            name,
            amount,
            expense_date,
            expense_category,
            payment,
            comment,
            userid: userId // Assign the user ID
        };

        // Add the status to each split member
        const splitMembersWithStatus = split_members.map(member => ({
            ...member,
            status: "Pending" // Set the default status to "Pending" for each split member
        }));

        // Add the split members to the new expense object
        newExpense.split_members = splitMembersWithStatus;

        // Add the new expense to the group's expenses array
        group.expenses.push(newExpense);

        // Save the updated group document to the database
        const updatedGroup = await group.save();

        res.status(201).json({
            success: true,
            message: "Expense created successfully!",
            expense: newExpense,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


//http://localhost:2000/groupExpense/getExpenses/?groupId=66081d87da5e17aaa41f0abc
//user will get expenses of group that he has created
/**
 * Get all expenses created by a specific user within a group.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} JSON response containing the user's expenses in the group.
 */
const getExpenses = async (req, res) => {
    try {
        userId = req.decoded.userId;

        console.log(userId)
        // Extract user ID and group ID from query parameters
        const { groupId } = req.query;

        // Find the group by its ID
        const group = await groupModel.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Filter the group's expenses to find those created by the specified user
        const userExpenses = await groupModel.find({ _id: groupId });
        console.log(userExpenses)

        // Return the user's expenses in the group
        res.status(200).json({
            success: true,
            expenses: userExpenses
        });
    } catch (error) {
        // Handle internal server error
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//http://localhost:2000/groupExpense/memberExpense
//member will get expenses of group of which he is part of 
/**
 * Controller function to handle the GET request for retrieving expenses for a member.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - Returns JSON response containing the expenses for the member.
 * @throws {404} - If no expenses found for the member.
 * @throws {500} - Internal Server Error if server error occurs.
 */
const memberExpense = async (req, res) => {
    try {
        const userData = req.decoded;
        const userId = userData.userId;

        // Find the group where the member is added as a split member
        console.log(expenses)
        const group = await groupModel.findOne({ "expenses.split_members.member_id": userId });

        if (!group) {
            return res.status(404).json({ error: "No expenses found for the member" });
        }

        // Filter expenses for the member
        const memberExpenses = group.expenses.filter(expense => {
            return expense.split_members.some(member => member.userId.toString() === userId);
        });

        res.status(200).json({ memberExpenses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


//http://localhost:2000/groupExpense/updateStatus?expenseId=66094e555ce8957ccfcc96fb
//member can update  his status
/**
 * Update the status of an expense for a specific member.
 * @const updateExpenseStatus
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} JSON response indicating success or failure.
 */
const updateStatus = async (req, res) => {
    try {
        const userData = req.decoded;
        const userId = userData.email;
        console.log("adanslfnasklfnaslknflkasnflkasnflkasnflknasfnasl  "+userId);
        // Extract expense IDfrom query parameters
        console.log("yeh hai user id:-" + userId);
        const { expenseId } = req.query;

        // console.log("yeh hai expense id:-" + expenseId);

        // Find the group where the member is added as a split member

        // Find the group where the member is added as a split member
        const group = await groupModel.findOne({ "expenses._id": expenseId });
        

        if (!group) {
            return res.status(404).json({ error: "No expenses found for the member" });
        }
        // console.log(group+"yo");
        let expenseToUpdate = false;
        // Iterate over members to find the matching expense
        group.expenses.forEach(members => {
            // console.log(members);
            members.split_members.forEach(member => {
                // console.log("this tie  "+member.member_id)
                // console.log("hello "+member.member_id.toString());
                // console.log("user id "+ userId.toString());
                if (member.member_id.toString() == userId.toString()) {
                    expenseToUpdate = true
                    console.log("in if");
                }
                // } else {
                //     return res.status(404).json({ error: "Memeber not found" });
                // }
            })
        })

        if (!expenseToUpdate) {
            return res.status(404).json({ error: "Expense not found" });
        }

        group.expenses.forEach(members => {
            // console.log(members);
            members.split_members.forEach(member => {
                console.log(member.member_id)
                if (member.member_id.toString() === userId.toString()) {
                    expenseToUpdate = true
                    console.log(member.status);
                    if (member.status === "Pending") {
                        member.status = "Recieved"
                    }

                }
            })
        })


        // Toggle the status between "Pending" and "Received"
        // splitMember.status = splitMember.status === "Pending" ? "Received" : "Pending";

        // Save the updated group document to the database
        await group.save();

        // Sending response
        res.status(200).json({ success: true, message: "Expense status updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const convert = async (req, res) => {
    try {
        // Extract group ID from query parameters
        const { groupId } = req.query;

        // Find the group by ID
        const group = await groupModel.findById(groupId);

        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Extract member emails from the group
        const memberEmails = group.members;

        // Find corresponding user IDs for each member email
        const memberIds = [];
        for (const email of memberEmails) {
            const user = await UserModel.findOne({ email });
            if (user) {
                memberIds.push(user._id);
            }
        }

        // Check if any member ID is found
        if (memberIds.length === 0) {
            return res.status(404).json({ error: "No member IDs found for the given emails" });
        }

        res.status(200).json({
            success: true,
            memberIds: memberIds,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const getObjectIdByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email }); // Using UserModel instead of User
        if (!user) return res.status(404).send('User not found');
        res.send(user._id);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getEmailById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id);
        if (!user) return res.status(404).send('User not found');
        res.send(JSON.stringify(user.email));
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { createExpense, getExpenses, memberExpense, updateStatus, convert, getObjectIdByEmail, getEmailById }

