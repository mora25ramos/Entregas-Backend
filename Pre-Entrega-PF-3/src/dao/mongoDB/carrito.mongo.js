import { getDB } from '../../db/db.js';

export default class CarritoDAO {
  static async create(carrito) {
    try {
      const db = getDB();
      const result = await db.collection('carritos').insertOne(carrito);
      return result.insertedId;
    } catch (error) {
      console.error('Error occurred while creating a new cart:', error);
    }
  }

  static async save(cart, userId) {
    try {
      const db = getDB();
      const query = { userId: userId };
      const update = {
        $set: { products: cart },
        $setOnInsert: { userId: userId }
      };
      const options = { upsert: true, returnOriginal: false };
      const result = await db.collection('cart').findOneAndUpdate(query, update, options);
      return result.value.products || [];
    } catch (error) {
      console.error(`Error occurred while saving cart for user: ${userId}. Error: ${error}`);
    }
  }

  static async getAll() {
    try {
      const db = getDB();
      const carritos = await db.collection('carritos').find().toArray();
      return carritos;
    } catch (error) {
      console.error('Error occurred while retrieving carts:', error);
    }
  }

  static async getById(userId) {
    try {
      const db = getDB();
      const result = await db.collection('cart').findOne({ userId: userId });
      return result;
    } catch (error) {
      console.error(`Error occurred while finding cart for user: ${userId}. Error: ${error}`);
    }
  }

  static async deleteById(userId) {
    try {
      const db = getDB();
      await db.collection('cart').deleteOne({ userId: userId });
    } catch (error) {
      console.error(`Error occurred while deleting cart for user: ${userId}. Error: ${error}`);
    }
  }
}