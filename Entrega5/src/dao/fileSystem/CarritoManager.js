import CarritoDAO from "../mongoDB/carritoDAO.js";

class CarritoManager {
  async addProductToCart(productId, userId) {
    const cart = await this.getCartByUserId(userId);
    const existingProductIndex = cart.findIndex(
      (product) => product.id === productId
    );
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }
    await CarritoDAO.save(cart, userId);
    return cart;
  }

  async removeProductFromCart(productId, userId) {
    const cart = await this.getCartByUserId(userId);
    const existingProductIndex = cart.findIndex(
      (product) => product.id === productId
    );
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity -= 1;
      if (cart[existingProductIndex].quantity === 0) {
        cart.splice(existingProductIndex, 1);
      }
      await CarritoDAO.save(cart, userId);
      return cart;
    } else {
      throw new Error("Producto no encontrado en el carrito");
    }
  }

  async getCartByUserId(userId) {
    const cart = await CarritoDAO.findByUserId(userId);
    if (!cart) {
      return [];
    }
    return cart.products;
  }

  async deleteCartByUserId(userId) {
    await CarritoDAO.deleteByUserId(userId);
  }
}

export default CarritoManager;