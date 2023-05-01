import { getDB } from "../../db/db.js";
import CarritoDAO from "../mongoDB/carritoDAO.js";

class CarritoManager {
  async addProductToCart(productId, userId) {
    const db = getDB();
    const cart = await this.getCartByUserId(userId);
    const existingProductIndex = cart.findIndex(
      (product) => product.id === productId
    );
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }
    await CarritoDAO.save(cart, userId, db);
    return cart;
  }

  async removeProductFromCart(productId, userId) {
    const db = getDB();
    const cart = await this.getCartByUserId(userId);
    const existingProductIndex = cart.findIndex(
      (product) => product.id === productId
    );
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity -= 1;
      if (cart[existingProductIndex].quantity === 0) {
        cart.splice(existingProductIndex, 1);
      }
      await CarritoDAO.save(cart, userId, db);
      return cart;
    } else {
      throw new Error("Producto no encontrado en el carrito");
    }
  }

  async getCartByUserId(userId) {
    const db = getDB();
    const cart = await CarritoDAO.findByUserId(userId, db);
    if (!cart) {
      return [];
    }
    return cart.products;
  }

  async deleteCartByUserId(userId) {
    const db = getDB();
    await CarritoDAO.deleteByUserId(userId, db);
  }
}

export default CarritoManager;