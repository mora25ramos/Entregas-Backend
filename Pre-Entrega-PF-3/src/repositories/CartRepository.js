import CarritoDAO from '../dao/mongoDB/carrito.mongo.js';

class CartRepository {
  async getCartById(cartId) {
    try {
      const cart = await CarritoDAO.getById(cartId);
      return cart;
    } catch (error) {
      throw new Error(`Error al buscar carrito con id: ${cartId}`);
    }
  }

  async createCart(cartData) {
    try {
      const newCart = await CarritoDAO.create(cartData);
      return newCart;
    } catch (error) {
      throw new Error('Error creando carrito');
    }
  }

  async updateCart(cartId, cartData) {
    try {
      const updatedCart = await CarritoDAO.update(cartId, cartData);
      return updatedCart;
    } catch (error) {
      throw new Error(`Error actualizando carrito con id: ${cartId}`);
    }
  }

  async deleteCart(cartId) {
    try {
      const deletedCart = await CarritoDAO.delete(cartId);
      return deletedCart;
    } catch (error) {
      throw new Error(`Error eliminando carrito con id: ${cartId}`);
    }
  }
}

export default new CartRepository();