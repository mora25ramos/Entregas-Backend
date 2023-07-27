import { getDB } from '../../db/db.js';
import { getUserByIdService} from '../../services/userService.js';

class UserDAO {
  //Crear un nuevo usuario
  static async create (user) {
    try {
      const db = getDB();
      const result = await db.collection('users').insertOne(user);
      return result.insertedId;
    } catch (error) {
      console.error('Ocurrio un error al crear el nuevo usuario:', error);
    }
  }

  //Traer todos los usuarios existentes
  static async getAll() {
    try {
      const db = getDB();
      const users = await db.collection('users').find().toArray();
      return users;
    } catch (error) {
      console.error('Ocurrio un error al traer los usuarios:', error);
    }
  }

  //Traer un usuario especìfico
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

  //Traer un usuario especìfico por email
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

  //Actualizar o modificar un usuario
  static async update(email, updatedUser) {
    try {
      const db = getDB();
      const result = await db.collection('users').updateOne({ email: email }, { $set: updatedUser });
      return result.modifiedCount;
    } catch (error) {
      console.error('Ocurrio un error al modificar el usuario:', error);
    }
  }

  //Eliminar u usuario
  static async delete(id) {
    try{
      const db = getDB();
      const result = await db.collection('users').deleteOne({_id: id});
      return result.deletedCount;
    } catch (error) {
      console.error ('Ocurrio un error al eliminar el usuario:', error);
    }
  }
}

//Export de las funcioes como objeto
export const UserDAOFunctions = {
  create: UserDAO.create, 
  update: UserDAO.update, 
  delete: UserDAO.delete,
  getOne: UserDAO.getOne, 
  getById: UserDAO.getById, 
  getAll: UserDAO.getAll
}