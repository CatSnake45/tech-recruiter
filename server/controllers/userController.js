import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const userController = {};

userController.register = async (req, res, next) => {
  try {
    //console.log('REGISTER FUNC CALLED');
    const { userName, password, city } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ userName, password: passwordHash, city });
    const savedUser = await newUser.save();

    res.locals.savedUser = savedUser;
    return next();
  } catch (error) {
    //return res.status(400).json({ error: `Could not create user ${error}` });
    return next({
      log: `userController.register: Error: ${error}`,
      status: 500,
      message: { err: 'Error ocurred in userController.register.' },
    });
  }
};

userController.login = async (req, res, next) => {
  try {
    //
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

    res.locals.user = user;
    return next();
  } catch (error) {
    return next({
      log: `userController.login: Error: ${error}`,
      status: 500,
      message: { err: 'Error ocurred in userController.login.' },
    });
    //return res.status(500).json({ error: error.message });
  }
};

userController.getUserData = async (req, res, next) => {
  try {
    const { userName } = req.body;

    const user = await User.findOne({ userName: userName });

    if (!user) {
      return res.status(400).json({ error: 'Username not found' });
    }
    res.locals.userData = user;
    return next();
  } catch (error) {
    return next({
      log: `userController.getUserData: Error: ${error}`,
      status: 500,
      message: { err: 'Error ocurred in userController.getUserData.' },
    });
    //return res.status(500).json({ error: error.message });
  }
};

export default userController;
