import { getDB } from "../../db/db.js";
import { Product } from "../models/Product.js";

class ProductDAO {
  constructor() {}

  async addProduct(product) {
    try {
      const db = await getDB();
      await db.collection("productos").insertOne(product);
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      const db = await getDB();
      const products = await db.collection("productos").find({}).toArray();
      return products.map((product) => {
        const { _id: id, ...productWithoutId } = product;
        return new Product(id, productWithoutId.title, productWithoutId.price, productWithoutId.thumbnail);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const db = await getDB();
      const product = await db.collection("productos").findOne({ _id: id });
      if (product) {
        const { _id: id, ...productWithoutId } = product;
        return new Product(id, productWithoutId.title, productWithoutId.price, productWithoutId.thumbnail);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, update) {
    try {
      const db = await getDB();
      const result = await db.collection("productos").updateOne({ _id: id }, { $set: update });
      return result.modifiedCount;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const db = await getDB();
      const result = await db.collection("productos").deleteOne({ _id: id });
      return result.deletedCount;
    } catch (error) {
      console.log(error);
    }
  }
}

export default {ProductDAO};