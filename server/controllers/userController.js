const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const userController = {};

userController.register = async (req, res) => {
  try {
    console.log('REGISTER FUNC CALLED');
    const { userName, password, city } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ userName, password: passwordHash, city });
    const savedUser = await newUser.save();

    return res.status(200).json(savedUser);
  } catch (error) {
    return res.status(400).json({ error: `Could not create user ${error}` });
  }
};

userController.login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName: userName });

    console.log('USER', user);
    if (!user) {
      return res.status(400).json({ error: 'Username not found' });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    console.log('correctPassword', correctPassword);
    if (!correctPassword) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

userController.getUserData = async (req, res) => {
  try {
    const { userName } = req.body;

    const user = await User.findOne({ userName: userName });

    if (!user) {
      return res.status(400).json({ error: 'Username not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = userController;
