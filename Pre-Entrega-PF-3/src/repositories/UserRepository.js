import { UserDAOFunctions } from '../dao/mongoDB/user.mongo.js';
import UserDTO from '../dto/UserDTO.js';

class UserRepository {
  async getById(userId) {
    try {
      const userData = await UserDAOFunctions.getById(userId);
      const user = UserDTO.fromData(userData);
      return user;
    } catch (error) {
      throw new Error(`Ocurrio un error al buscar al usuario on id: ${userId}`);
    }
  }

  async getByEmail(email) {
    try {
      const userData = await UserDAOFunctions.getOne(email);
      const user = UserDTO.fromData(userData);
      return user;
    } catch (error) {
      throw new Error(`Ocurrio un error al buscar al usuario con email: ${email}`);
    }
  }

  async create(userData) {
    try {
      const newUser = await UserDAOFunctions.create(userData);
      const user = UserDTO.fromData(newUser);
      return user;
    } catch (error) {
      throw new Error('Error al crear nuevo usuario');
    }
  }

  async update(userId, userData) {
    try {
      const updatedUser = await UserDAOFunctions.update(userId, userData);
      const user = UserDTO.fromData(updatedUser);
      return user;
    } catch (error) {
      throw new Error(`Error al actualizar el usuario con id: ${userId}`);
    }
  }

  async delete(userId) {
    try {
      const deletedUser = await UserDAOFunctions.delete(userId);
      const user = UserDTO.fromData(deletedUser);
      return user;
    } catch (error) {
      throw new Error(`Error al borrar al usuario con id: ${userId}`);
    }
  }
}

export default new UserRepository();