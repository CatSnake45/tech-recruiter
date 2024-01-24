import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const userController = {};

userController.register = async (req, res, next) => {
  try {
    // console.log('REGISTER FUNC CALLED');
    const { userName, password, city } = req.body;
    // input value is always a string, so I will compare it to a number
    if (!isNaN(parseInt(userName)) || !isNaN(parseInt(city))) {
      return next({
        log: `Error occured in userController.register: Bad Input!`,
        status: 400,
        message: {
          err: `Please enter a valid username and city!`,
        },
      });
    }
    // check if user exists!
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return next({
        log: `Error occured in userController.register: Username already exists!`,
        status: 400,
        message: {
          err: 'Username already exists!',
        },
      });
    }

    // salt the password and create the new user
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      userName,
      password: passwordHash,
      city,
    });
    // console.log(newUser);

    res.locals.savedUser = newUser;
    return next();
  } catch (error) {
    // Check if the error is a validation error
    if (error.name === 'ValidationError') {
      return next({
        log: 'userController.register: Validation Error',
        status: 400,
        message: {
          err: 'User Validation error:',
          details: error.message,
        },
      });
    }

    // All unhandled errors return a 500 status code
    return next({
      log: `userController.register: Error: ${error}`,
      status: 500,
      message: { err: 'Error occurred in userController.register.' },
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
    console.log('usercontroller.login: user: ', user);
    console.log('usercontroller.login: {user}: ', { user });
    res.locals.user = { user };
    return next();
  } catch (error) {
    return next({
      log: `userController.login: Error: ${error}`,
      status: 500,
      message: { err: 'Error ocurred in userController.login.' },
    });
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
  }
};

export default userController;
