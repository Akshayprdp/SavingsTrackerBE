const Expense = require("../Model/expenseModel");
const mongoose = require("mongoose");

// Add an expense
module.exports.addExpense = async (req, res) => {
  const { userId, expenses } = req.body;

  try {
    if (!userId || !expenses || !Array.isArray(expenses) || expenses.length === 0) {
      return res.status(400).json({ message: "Missing required fields or invalid expenses", success: false });
    }

    let userExpenses = await Expense.findOne({ userId });

    if (!userExpenses) {
      userExpenses = new Expense({ userId, expenses });
      await userExpenses.save();
    } else {
      userExpenses.expenses.push(...expenses); // Add multiple expenses
      await userExpenses.save();
    }

    res.json({ message: "Expense(s) added successfully", success: true, userExpenses });
  } catch (error) {
    console.error("Error adding expense(s):", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Get all expenses for a user
module.exports.getExpenses = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId", success: false });
    }

    const userExpenses = await Expense.findOne({ userId });

    if (!userExpenses) {
      return res.status(404).json({ message: "No expenses found for the user", success: false });
    }

    res.json({ success: true, expenses: userExpenses.expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Update an expense for a user
module.exports.updateExpense = async (req, res) => {
  const { userId, expenseId } = req.params;
  const { Category, Amount, Description, date } = req.body;

  try {
    const userExpenses = await Expense.findOne({ userId });
    if (!userExpenses) {
      return res.status(404).json({ message: "User expenses not found", success: false });
    }

    const expense = userExpenses.expenses.id(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found", success: false });
    }

    // Update fields if provided
    if (Category) expense.Category = Category;
    if (Amount) expense.Amount = Amount;
    if (Description) expense.Description = Description;
    if (date) expense.date = date;

    await userExpenses.save();
    res.json({ message: "Expense updated successfully", success: true, updatedExpense: expense });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Remove an expense for a user
module.exports.removeExpense = async (req, res) => {
  const { userId, expenseId } = req.params;

  try {
    const userExpenses = await Expense.findOne({ userId });
    if (!userExpenses) {
      return res.status(404).json({ message: "User expenses not found", success: false });
    }

    const expense = userExpenses.expenses.id(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found", success: false });
    }

    expense.remove(); // Remove the expense
    await userExpenses.save();

    res.json({ message: "Expense removed successfully", success: true, remainingExpenses: userExpenses.expenses });
  } catch (error) {
    console.error("Error removing expense:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
