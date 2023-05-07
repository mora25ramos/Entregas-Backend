import { getDB } from '../../db/db.js';

class CarritoDAO {
  static async create(cart, userId) {
    try {
      const db = await getDB();
      const result = await db.collection('cart').insertOne({ userId, products: cart });
      return result.insertedId;
    } catch (e) {
      console.error(`Error occurred while creating cart for user: ${userId}. Error: ${e}`);
    }
  }

  static async getAll() {
    try {
      const db = await getDB();
      const result = await db.collection('cart').find().toArray();
      return result;
    } catch (e) {
      console.error(`Error occurred while getting all carts. Error: ${e}`);
    }
  }

  static async update(cart, userId) {
    try {
      const db = await getDB();
      const query = { userId: userId };
      const update = {
        $set: { products: cart },
      };
      const options = { returnOriginal: false };
      const result = await db.collection('cart').findOneAndUpdate(query, update, options);
      return result.value;
    } catch (e) {
      console.error(`Error occurred while updating cart for user: ${userId}. Error: ${e}`);
    }
  }

  static async findByUserId(userId) {
    try {
      const db = await getDB();
      const result = await db.collection('cart').findOne({ userId: userId });
      return result;
    } catch (e) {
      console.error(`Error occurred while finding cart for user: ${userId}. Error: ${e}`);
    }
  }

  static async deleteByUserId(userId) {
    try {
      const db = await getDB();
      await db.collection('cart').deleteOne({ userId: userId });
    } catch (e) {
      console.error(`Error occurred while deleting cart for user: ${userId}. Error: ${e}`);
    }
  }
}

export default CarritoDAO;