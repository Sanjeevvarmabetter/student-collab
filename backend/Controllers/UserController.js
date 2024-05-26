const User = require("../models/UserModel");

module.exports.fetchDetails = async (req, res, next) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({username});
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user)
    res.json(user);
  } catch (error) {
    console.error('Error retrieving user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

