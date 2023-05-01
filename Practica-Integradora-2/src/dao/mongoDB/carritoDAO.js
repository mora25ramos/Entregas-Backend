import { getDB } from '../../db/db.js';

class CarritoDAO {
  static async save(cart, userId, db) {
    try {
      const query = { userId: userId };
      const update = {
        $set: { products: cart },
        $setOnInsert: { userId: userId }
      };
      const options = { upsert: true, returnOriginal: false };
      const result = await db.collection('cart').findOneAndUpdate(query, update, options);
      return result.value.products || [];
    } catch (e) {
      console.error(`Error occurred while saving cart for user: ${userId}. Error: ${e}`);
    }
  }

  static async findByUserId(userId, db) {
    try {
      const result = await db.collection('cart').findOne({ userId: userId });
      return result;
    } catch (e) {
      console.error(`Error occurred while finding cart for user: ${userId}. Error: ${e}`);
    }
  }

  static async deleteByUserId(userId, db) {
    try {
      await db.collection('cart').deleteOne({ userId: userId });
    } catch (e) {
      console.error(`Error occurred while deleting cart for user: ${userId}. Error: ${e}`);
    }
  }
}

export default CarritoDAO;
