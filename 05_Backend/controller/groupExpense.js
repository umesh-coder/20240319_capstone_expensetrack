//interal dependencies
const UserModel = require('../models/userModel');
const groupModel = require('../models/groupModel')

/*
{
    "name": "Groceries",
    "amount": 80,
    "expense_date": "2022-03-30",
    "expense_category": "Food",
    "payment": "Credit Card",
    "comment": "Weekly grocery shopping",
    "split_members": [
      {"member_id": "60f6de8066b1c12288a86328", "shareamount": 40},
      {"member_id": "60f6de8066b1c12288a8632a", "shareamount": 40}
    ],
    "status": "Pending",
    "userid": "60f6de8066b1c12288a86328" 
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
        // Extract expense details from the request body
        const { name, amount, expense_date, expense_category, payment, comment, split_members, status,userid } = req.body;
        
        // Extract groupId from the request query
        const { groupId } = req.query;

        // Check if the group exists
        const group = await groupModel.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }
        
        // Create a new expense object
        const newExpense = {
            name: name,
            amount: amount,
            expense_date: expense_date,
            expense_category: expense_category,
            payment: payment,
            comment: comment,
            split_members: split_members,
            status: status,
            userid:userid
        };
        
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

//http://localhost:2000/groupExpense/getExpenses/?groupId=66081d87da5e17aaa41f0abc&userId=60f6de8066b1c12288a86328
/**
 * Get all expenses created by a specific user within a group.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} JSON response containing the user's expenses in the group.
 */
const getExpenses = async (req, res) => {
    try {
        // Extract user ID and group ID from query parameters
        const { userId, groupId } = req.query;

        // Find the group by its ID
        const group = await groupModel.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Filter the group's expenses to find those created by the specified user
        const userExpenses = group.expenses.filter(expense => expense.userid.toString() === userId);

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

  module.exports = {createExpense,getExpenses}