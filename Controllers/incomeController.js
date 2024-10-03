const Income = require("../Model/incomeModel");

exports.addIncome = async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const newIncome = new Income({
      userId,
      amount,
    });

    await newIncome.save();

    return res.status(201).json({
      success: true,
      message: "Income saved successfully",
      income: newIncome,
    });
  } catch (error) {
    console.error("Error saving income:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getIncomeByUserId = async (req, res) => {
  try {
    const userId = req.params.userId; 

    const income = await Income.find({ userId });

    if (!income || income.length === 0) {
      return res
        .status(404)
        .json({ message: "No income data found for this user." });
    }
    return res.status(200).json(income);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

module.exports.removeIncome = async (req, res) => {
  const { userId, incomeId } = req.params;
  try {
    const income = await Income.findOneAndDelete({ _id: incomeId, userId });

    if (!income) {
      return res
        .status(404)
        .json({ message: "Income not found", success: false });
    }

    res.json({ message: "Income removed successfully", success: true });
  } catch (error) {
    console.error("Error removing income:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
