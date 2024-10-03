const Income = require('../Model/incomeModel'); 


exports.addIncome = async (req, res) => {
  const { userId, amount} = req.body;

  try {
    const newIncome = new Income({
      userId,
      amount,
    });

    await newIncome.save();

    return res.status(201).json({
      success: true,
      message: 'Income saved successfully',
      income: newIncome,
    });
  } catch (error) {
    console.error("Error saving income:", error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};


exports.updateIncome = async (req, res) => {
  const { userId, amount } = req.body; 

  try {
    const updatedIncome = await Income.findOneAndUpdate(
      { userId }, 
      { amount }, 
      { new: true } 
    );

    if (!updatedIncome) {
      return res.status(404).json({
        success: false,
        message: 'Income not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Income updated successfully',
      income: updatedIncome,
    });
  } catch (error) {
    console.error("Error updating income:", error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

exports.getIncomeByUserId = async (req, res) => {
  try {
    const userId = req.params.userId; // Retrieve the userId from request parameters

    // Find income data for the given userId
    const income = await Income.find({ userId });

    if (!income || income.length === 0) {
      return res.status(404).json({ message: 'No income data found for this user.' });
    }

    // Return income data
    return res.status(200).json(income);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
