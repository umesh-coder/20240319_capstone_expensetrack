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
        const { name, amount, expense_date, expense_category, payment, comment, split_members} = req.body;
        
        // Extract groupId from the request query
        const { groupId } = req.query;

        // Check if the group exists
        const group = await groupModel.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Check if the user is a member of the group or the creator of the group
        const isGroupMember = group.members.includes(userId);
        const isGroupCreator = group.groupcreatedby.toString() === userId;
        if (!isGroupMember && !isGroupCreator) {
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
        const userData = req.decoded;
        const userId = userData.userId;
        // Extract user ID and group ID from query parameters
        const { groupId } = req.query;

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
        const group = await groupModel.findOne({ "expenses.split_members.userId": userId });

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
        const userId = userData.userId;
        // Extract expense IDfrom query parameters
        const { expenseId } = req.query;

        // Find the group where the member is added as a split member
        const group = await groupModel.findOne({ "expenses.split_members.member_id": userId });
        if (!group) {
            return res.status(404).json({ error: "No expenses found for the member" });
        }

        // Find the expense in the group's expenses array
        const expense = group.expenses.find(expense => expense._id.toString() === expenseId);
        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }

        // Find the split member within the expense
        const splitMember = expense.split_members.find(member => member.userId.toString() === userId);
        if (!splitMember) {
            return res.status(404).json({ error: "Member not found in expense" });
        }

        // Toggle the status between "Pending" and "Received"
        splitMember.status = splitMember.status === "Pending" ? "Received" : "Pending";

        // Save the updated group document to the database
        await group.save();

        // Sending response
        res.status(200).json({ success: true, message: "Expense status updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


/**
 * @function getMembersByGroupId
 * @param {*} req - The request object containing the group ID.
 * @param {*} res - The response object used to send the response back to the client.
 * @description This function retrieves all members of a group based on the provided group ID.
 */
const getMembers= async (req, res) => {
    try {
      // Extract the group ID from the request parameters
      const { groupId } = req.query;
  
      // Find the group by ID
      const group = await groupModel.findById(groupId);
  
      if (!group) {
        return res.status(404).json({ error: "Group not found" });
      }
  
      // Extract the list of members from the group
      const members = group.members;
  
      res.status(200).json({
        success: true,
        members: members,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

module.exports = {createExpense,getExpenses,memberExpense,updateStatus,getMembers}

