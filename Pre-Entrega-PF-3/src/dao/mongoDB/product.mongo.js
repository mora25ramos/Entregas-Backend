import { getDB } from '../../db/db.js';

class ProductDAO {
  constructor(db) {
    this.db = db;
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

  async getProductById(id) {
    try {
      const product = await this.db.collection(this.collection).findOne({ id });
      return product;
    } catch (error) {
      console.error(`Error occurred while retrieving product with ID ${id}:`, error);
      throw error;
    }
  }

  async addProduct(productData) {
    try {
      const result = await this.db.collection(this.collection).insertOne(productData);
      return { id: result.insertedId, ...productData };
    } catch (error) {
      console.error('Error occurred while adding product:', error);
      throw error;
    }
  }

  async updateProduct(id, productData) {
    try {
      await this.db.collection(this.collection).updateOne({ id }, { $set: productData });
      return { id, ...productData };
    } catch (error) {
      console.error(`Error occurred while updating product with ID ${id}:`, error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const product = await this.getProductById(id);
      if (!product) {
        return null;
      }
      await this.db.collection(this.collection).deleteOne({ id });
      return product;
    } catch (error) {
      console.error(`Error occurred while deleting product with ID ${id}:`, error);
      throw error;
    }
  }
}

export default ProductDAO;