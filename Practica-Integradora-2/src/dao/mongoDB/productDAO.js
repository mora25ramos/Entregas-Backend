import { db } from '../../config.js';

class ProductDAO {
  async getAll() {
    return db('products');
  }

  async getProductById(id) {
    const [product] = await db('products').where({ id });
    return product;
  }

  async addProduct(productData) {
    const [productId] = await db('products').insert(productData);
    return { id: productId, ...productData };
  }

  async updateProduct(id, productData) {
    await db('products').where({ id }).update(productData);
    return { id, ...productData };
  }

  async deleteProduct(id) {
    const product = await this.getProductById(id);
    if (!product) {
      return null;
    }
    await db('products').where({ id }).del();
    return product;
  }
}

export default new ProductDAO();