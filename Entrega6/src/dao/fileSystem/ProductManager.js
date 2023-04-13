import { Product } from "../models/Product.js";
import productDAO from "../mongoDB/productDAO.js";

export class ProductManager {
  static async getAll() {
    return await productDAO.getAll();
  }

  static async getProductById(id) {
    return await productDAO.getProductById(id);
  }

  static async addProduct(productData, userId) {
    const newProduct = new Product(productData);
    newProduct.userId = userId;
    return await productDAO.addProduct(newProduct);
  }

  static async updateProduct(id, productData, userId) {
    const updatedProduct = new Product(productData);
    updatedProduct.userId = userId;
    return await productDAO.updateProduct(id, updatedProduct);
  }

  static async deleteProduct(id, userId) {
    return await productDAO.deleteProduct(id, userId);
  }
}
