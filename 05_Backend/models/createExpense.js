const mongoose = require("mongoose");

const createexpense = mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  expense_date: { type: String, required: true },
  expense_category: { type: String, required: true },
  payment: { type: String, required: true },
  comment: { type: String, required: false },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "userschema", required: true },
});

module.exports = mongoose.model("createexpenses", createexpense); 
