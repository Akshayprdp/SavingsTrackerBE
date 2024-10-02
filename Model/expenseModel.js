const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  expenses: [{
    date: { type: Date, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true }, // Make sure this is Number
    description: { type: String, required: true }
  }]
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
