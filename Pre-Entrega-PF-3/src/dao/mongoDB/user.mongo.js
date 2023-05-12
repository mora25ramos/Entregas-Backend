import { getDB } from '../../db/db.js';

class UserDAO {
  static async create(user) {
    try {
      const db = getDB();
      const result = await db.collection('users').insertOne(user);
      return result.insertedId;
    } catch (error) {
      console.error('Error occurred while creating a new user:', error);
    }
  }

  static async getAll() {
    try {
      const db = getDB();
      const users = await db.collection('users').find().toArray();
      return users;
    } catch (error) {
      console.error('Error occurred while retrieving users:', error);
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
      console.error('Error occurred while retrieving a user by ID:', error);
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
      console.error('Error occurred while retrieving a user by email:', error);
    }
  }

  static async update(email, updatedUser) {
    try {
      const db = getDB();
      const result = await db.collection('users').updateOne({ email: email }, { $set: updatedUser });
      return result.modifiedCount;
    } catch (error) {
      console.error('Error occurred while updating a user:', error);
    }
  }
}

export default UserDAO;