const SavingsGoal = require('../Model/savingModel'); // Adjust the path as needed

// Controller function to add a savings goal
const addSavingsGoal = async (req, res) => {
  try {
    const { userId, goal } = req.body; // Destructure userId and goal from the request body

    // Create a new savings goal instance
    const newSavingsGoal = new SavingsGoal({
      userId,
      goal,
    });

    // Save the savings goal to the database
    const savedGoal = await newSavingsGoal.save();

    // Send a success response
    res.status(201).json({
      success: true,
      message: 'Savings goal added successfully',
      data: savedGoal,
    });
  } catch (error) {
    console.error('Error saving savings goal:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding savings goal',
      error: error.message,
    });
  }
};

module.exports = {
  addSavingsGoal,
};
