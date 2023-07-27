import { getDB } from '../../db/db.js';

export default class ProductDAO {
  constructor() {
    this.db = getDB();
    this.collection = 'products';
  }

  async getAll() {
    try {
      const products = await this.db.collection(this.collection).find().toArray();
      return products;
    } catch (error) {
      console.error('Error occurred while retrieving products:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const product = await this.db.collection(this.collection).findOne({ _id: id });
      return product;
    } catch (error) {
      console.error(`Error occurred while retrieving product with ID ${id}:`, error);
      throw error;
    }
  }

  async create(productData) {
    try {
      const result = await this.db.collection(this.collection).insertOne(productData);
      return result.insertedId ? { _id: result.insertedId, ...productData } : null;
    } catch (error) {
      console.error('Error occurred while adding product:', error);
      throw error;
    }
  }

  async update(id, productData) {
    try {
      await this.db.collection(this.collection).updateOne({ _id: id }, { $set: productData });
      return { _id: id, ...productData };
    } catch (error) {
      console.error(`Error occurred while updating product with ID ${id}:`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const product = await this.getById(id);
      if (!product) {
        return null;
      }
      await this.db.collection(this.collection).deleteOne({ _id: id });
      return product;
    } catch (error) {
      console.error(`Error occurred while deleting product with ID ${id}:`, error);
      throw error;
    }
  }
}
