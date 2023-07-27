import userDTO from '../dto/userDTO.js';
import UserRepository from '../repositories/UserRepository.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

const saltRounds = 10;

export const createUserController = async (userData) => {
  try {
    const { name, email, password, role } = userData;

    // Chequear si el usuario con ese email ya existe
    const existingUser = await UserRepository.getByEmail(email);
    if (existingUser) {
      throw new Error('Ya existe un usuario con este email');
    }

    // Hash the password antes de guardarla
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: role || 'user', // El rol por defecto será 'user' si no se especifica
    };

    const createdUser = await UserRepository.create(newUser);
    return UserDTO.fromModel(createdUser);
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo crear el usuario');
  }
};

export const getUserByIdController = async (userId) => {
  try {
    const user = await UserRepository.getById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return userDTO.fromModel(user);
  } catch (error) {
    console.error(error);
    throw new Error('No se encontró el usuario');
  }
};

export const updateUserController = async (userId, userData) => {
  try {
    const { name, email, password, role } = userData;

    // Chequear si el email ya lo tiene otro usuario
    const existingUser = await UserRepository.getByEmail(email);
    if (existingUser && existingUser.id !== userId) {
      throw new Error('Ya existe un usuario con este email');
    }

    // Hash the password antes de guardarla
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = {
      name,
      email,
      password: hashedPassword,
      role: role || 'user', // El rol por defecto será 'user' si no se especifica
    };

    const updatedUserData = await UserRepository.update(userId, updatedUser);
    return userDTO.fromModel(updatedUserData);
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo actualizar el usuario');
  }
};

export const deleteUserController = async (userId) => {
  try {
    const deletedUser = await UserRepository.delete(userId);
    if (!deletedUser) {
      throw new Error('Usuario no encontrado');
    }
    return userDTO.fromModel(deletedUser);
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo eliminar el usuario');
  }
};

export const sendEmailToAdmin = async (adminEmail, action, userId) => {
  try {
    const user = await UserRepository.getById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const message = {
      from: 'tu_correo@gmail.com', // Cambiar por el correo desde el que se enviará el email
      to: adminEmail,
      subject: `Usuario ${action}`,
      text: `El usuario con ID ${userId} ha sido ${action} por un administrador.`,
    };

    // Configurar el transporter para enviar el email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Cambiar según el proveedor del correo
      port: 587,
      secure: false,
      auth: {
        user: 'tu_correo@gmail.com', // Cambiar por el correo desde el que se enviará el email
        pass: 'tu_contraseña', // Cambiar por la contraseña del correo
      },
    });

    // Enviar el mensaje usando el objeto transporter
    const info = await transporter.sendMail(message);
    console.log(`Email enviado: ${info.response}`);
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo enviar el email al administrador');
  }
};