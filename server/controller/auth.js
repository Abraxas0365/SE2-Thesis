const bcrypt = require("bcrypt");
const User = require("../models/user_model");

exports.registerUser = async (req, res) => {
  try {
    // Takes the data from frontend
    const { first_name, last_name, email, password, user_organization } = req.body;
    // Check if user already exist thru email
    const existingUser = await User.findOne({ email });
    if(existingUser) {
        return res.status(400).json({ message: "Email already exist."})
    }
    // Hashes the password
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);
    // Creates the user data using the user model
    const user = new User({
        first_name,
        last_name,
        email,
        hashed_password,
        user_organization
    });

    await user.save();

    res.status(201).json({
        message: "User registered successfully"
    })
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
};
