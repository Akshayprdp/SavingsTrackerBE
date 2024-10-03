const SavingsGoal = require('../Model/savingModel'); // Adjust the path as needed

// Controller function to add a savings goal
exports.addSavingsGoal = async (req, res) => {
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

// module.exports = {
//   addSavingsGoal,
// };


exports.getSavingsGoalByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const savingsGoal = await SavingsGoal.find({ userId });

    if (!savingsGoal || savingsGoal.length === 0) {
      return res
        .status(404)
        .json({ message: "No savings goal data found for this user." });
    }
    return res.status(200).json(savingsGoal);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

exports.deleteSavingsGoal = async (req, res) => {
  const { userId, savingsId } = req.params;
  // console.log("Received userId:", userId);
  console.log("Received savingsId:", savingsId);

  try {
    // Find and delete the savings goal
    const result = await SavingsGoal.findOneAndDelete({ _id: savingsId, userId });

    if (!result) {
      return res.status(404).json({ message: 'Savings goal not found or does not belong to user' });
    }

    return res.status(200).json({ message: 'Savings goal deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};