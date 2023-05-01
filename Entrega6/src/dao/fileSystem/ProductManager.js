import { Producto } from "../models/Product.js";
import { getDB } from "../../db/db.js";

export class ProductRepository {
  static async getAll() {
    const db = getDB();
    const products = await db.collection("products").find({}).toArray();
    return products;
  }

  static async getProductById(id) {
    const db = getDB();
    const product = await db.collection("products").findOne({ _id: id });
    return product;
  }

  static async addProduct(productData, userId) {
    const db = getDB();
    const newProduct = new Producto(productData);
    newProduct.userId = userId;
    const result = await db.collection("products").insertOne(newProduct);
    return result.insertedId;
  }

  static async updateProduct(id, productData, userId) {
    const db = getDB();
    const updatedProduct = new Producto(productData);
    updatedProduct.userId = userId;
    const result = await db.collection("products").updateOne(
      { _id: id },
      { $set: updatedProduct }
    );
    return result.modifiedCount > 0;
  }

  static async deleteProduct(id, userId) {
    const db = getDB();
    const result = await db.collection("products").deleteOne({
      _id: id,
      userId: userId,
    });
    return result.deletedCount > 0;
  }
}

export class ProductManager {
  static async getAll() {
    return await ProductRepository.getAll();
  }

  static async getProductById(id) {
    return await ProductRepository.getProductById(id);
  }

  static async addProduct(productData, userId) {
    return await ProductRepository.addProduct(productData, userId);
  }

  static async updateProduct(id, productData, userId) {
    const isUpdated = await ProductRepository.updateProduct(
      id,
      productData,
      userId
    );
    if (!isUpdated) {
      throw new Error("Product not found or you don't have permission to update it");
    }
    return true;
  }

  static async deleteProduct(id, userId) {
    const isDeleted = await ProductRepository.deleteProduct(id, userId);
    if (!isDeleted) {
      throw new Error("Product not found or you don't have permission to delete it");
    }
    return true;
  }
};