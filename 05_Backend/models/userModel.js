const mongoose = require("mongoose");

const uniqueValidator = require('mongoose-unique-validator');

const savedata = mongoose.Schema({
  username: ({ type: String }),
  name: ({ type: String }),
  firstlogindate: ({ type: String }),
  lastlogindate: ({ type: String }),
  expenselogged: ({ type: String }),
  userid: ({ type: String }),
});


const createexpense = mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  expense_date: { type: String, required: true },
  expense_category: { type: String, required: true },
  payment: { type: String, required: true },
  comment: { type: String, required: false },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "userschema", required: true },
});


const userschema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }, //not works as a validator so we import mongoose-unique-validator
  password: { type: String, required: true },
  userfirstsignupdate: { type: String, required: true },
  userdata: [savedata],
  expenses: [createexpense],
  category: [],
});

userschema.plugin(uniqueValidator);

module.exports = mongoose.model("userschemas", userschema);
