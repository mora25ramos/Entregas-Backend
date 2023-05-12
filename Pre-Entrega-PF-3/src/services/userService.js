import { createUser, getUserByEmail, getUserById, updateUser } from '../dao/mongoDB/userDAO.js';
import User from '../dao/models/User.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const createUserService = async (userData) => {
  try {
    const { name, email, password } = userData;

    // Check if user with the given email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash the password before storing it
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const result = await createUser(newUser);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Could not create user');
  }
};

export const getUserByIdService = async (userId) => {
  try {
    const result = await getUserById(userId);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Could not get user');
  }
};

export const updateUserService = async (userId, userData) => {
  try {
    const { name, email, password } = userData;

    // Check if user with the given email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser && existingUser._id.toString() !== userId) {
      throw new Error('User with this email already exists');
    }

    // Hash the password before storing it
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUserData = {
      name,
      email,
      password: hashedPassword,
    };

    const result = await updateUser(userId, updatedUserData);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Could not update user');
  }
};