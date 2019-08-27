const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const ExpenseSchema = new Schema({
  name: { type: String, trim: true, required: true },
  type: { type: String, required: true },
  fixedType: { type: String },
  start: { type: Date },
  end: { type: Date },
  cost: { type: Number, required: true },
  status: { type: String, required: true },
  color: { type: String },
  paidBy: [ { type: ObjectId, required: true } ],
  details: { type: String },
  createdAt: { type: Date, default: Date.now } 
})

const Expense = mongoose.model('Expense', ExpenseSchema);
module.exports = Expense;