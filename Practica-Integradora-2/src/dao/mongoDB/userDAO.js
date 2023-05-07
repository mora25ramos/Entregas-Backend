import { getDB } from "../../db/db.js";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let users;

export default class userDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.DB_NS).collection("users");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async createUser(userInfo) {
    try {
      const result = await users.insertOne({ ...userInfo });
      return { success: true, userId: result.insertedId };
    } catch (e) {
      console.error(`Error occurred while creating new user, ${e}`);
      return { error: e };
    }
  }

  static async getUserByEmail(email) {
    try {
      const user = await users.findOne({ email: email });
      return user;
    } catch (e) {
      console.error(`Error occurred while finding user by email, ${e}`);
      return { error: e };
    }
  }

  static async getUserById(id) {
    try {
      const user = await users.findOne({ _id: ObjectId(id) });
      return user;
    } catch (e) {
      console.error(`Error occurred while finding user by id, ${e}`);
      return { error: e };
    }
  }
  
  static async updateUser(userId, userInfo) {
    try {
      const updateResponse = await users.updateOne(
        { _id: ObjectId(userId) },
        { $set: { ...userInfo } }
      );
      return { success: updateResponse.modifiedCount === 1 };
    } catch (e) {
      console.error(`Error occurred while updating user, ${e}`);
      return { error: e };
    }
  }
};