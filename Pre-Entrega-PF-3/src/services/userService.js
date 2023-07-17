import { UserDAOFunctions } from '../dao/mongoDB/user.mongo.js';
import User from '../dao/models/User.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const createUserService = async (userData) => {
  try {
    const { name, email, password } = userData;

    // Chequear si el usuario con ese email ya existe
    const existingUser = await UserDAOFunctions.getOne(email);
    if (existingUser) {
      throw new Error('Ya existe un usuario con este email');
    }

    // Hash the password antes de guardarla
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const result = await UserDAOFunctions.create(newUser);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo crear el usuario');
  }
};

export const getUserByIdService = async (userId) => {
  try {
    const result = await UserDAOFunctions.getUserById(userId);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('No se encontro el usuario');
  }
};

export const updateUserService = async (userId, userData) => {
  try {
    const { name, email, password } = userData;

    // Chequear si el email ya lo tiene otro usuario
    const existingUser = await UserDAOFunctions.getOne(email);
    if (existingUser && existingUser._id.toString() !== userId) {
      throw new Error('Ya existe un usuario con este email');
    }

    // Hash the password antes de guardarla
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUserData = {
      name,
      email,
      password: hashedPassword,
    };

    const result = await UserDAOFunctions.update(userId, updatedUserData);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo actualizar el usuario');
  }
};

export default {
  createUserService,
  getUserByIdService,
  updateUserService
};