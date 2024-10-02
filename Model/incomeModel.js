const mongoose = require('mongoose');


const IncomeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
});

// Create the model
const Income = mongoose.model('Income', IncomeSchema);

module.exports = Income;
