import CartDAO from '../dao/CartDAO.js';

class CartRepository {
  async getCartById(cartId) {
    try {
      const cart = await CartDAO.getById(cartId);
      return cart;
    } catch (error) {
      throw new Error(`Error getting cart with ID: ${cartId}`);
    }
  }

  async createCart(cartData) {
    try {
      const newCart = await CartDAO.create(cartData);
      return newCart;
    } catch (error) {
      throw new Error('Error creating cart');
    }
  }

  async updateCart(cartId, cartData) {
    try {
      const updatedCart = await CartDAO.update(cartId, cartData);
      return updatedCart;
    } catch (error) {
      throw new Error(`Error updating cart with ID: ${cartId}`);
    }
  }

  async deleteCart(cartId) {
    try {
      const deletedCart = await CartDAO.delete(cartId);
      return deletedCart;
    } catch (error) {
      throw new Error(`Error deleting cart with ID: ${cartId}`);
    }
  }
}

export default new CartRepository();