import { getDB } from '../../db/db.js';
import { getUserByIdService} from '../../services/userService.js';

export class UserDAO {
  static async create (user) {
    try {
      const db = getDB();
      const result = await db.collection('users').insertOne(user);
      return result.insertedId;
    } catch (error) {
      console.error('Ocurrio un error al crear el nuevo usuario:', error);
    }
  }

  static async getAll() {
    try {
      const db = getDB();
      const users = await db.collection('users').find().toArray();
      return users;
    } catch (error) {
      console.error('Ocurrio un error al traer los usuarios:', error);
    }
  }

  static async getById(id) {
    try {
      const db = getDB();
      const user = await db.collection('users').findOne({ _id: id });
      // Omitir información sensible
      const { _id, name, email } = user;
      return { _id, name, email };
    } catch (error) {
      console.error('Ocurrio un error al traer el usuario por su Id:', error);
    }
  }

  static async getOne(email) {
    try {
      const db = getDB();
      const user = await db.collection('users').findOne({ email: email });
      // Omitir información sensible
      const { _id, name, email } = user;
      return { _id, name, email };
    } catch (error) {
      console.error('Ocurrio un error al traer el usuario por el email:', error);
    }
  }

  static async update(email, updatedUser) {
    try {
      const db = getDB();
      const result = await db.collection('users').updateOne({ email: email }, { $set: updatedUser });
      return result.modifiedCount;
    } catch (error) {
      console.error('Ocurrio un error al modificar el usuario:', error);
    }
  }
}

//Export de las funcioes como objeto
export const UserDAOFunctions = {
  create: UserDAO.create, 
  update: UserDAO.update, 
  getOne: UserDAO.getOne, 
  getById: UserDAO.getById, 
  getAll: UserDAO.getAll
}