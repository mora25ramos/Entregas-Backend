import CarritoDAO from '../dao/mongoDB/carrito.mongo.js';
import ProductManager from '../dao/fileSystem/ProductManager.js';

const createCarrito = async (carritoData) => {
  const newCarrito = await CarritoDAO.create(carritoData);
  return newCarrito;
};

const getCarritoByUserId = async (userId) => {
  try {
    const carritoData = await CarritoDAO.getCartByUserId(userId);
    return carritoData;
  } catch (error) {
    throw new Error(`Error getting carrito for user with ID: ${userId}`);
  }
};

const addToCarrito = async (userId, productId, quantity) => {
  try {
    const product = await ProductManager.getProductById(productId);
    if (!product) {
      throw new Error(`Product with ID: ${productId} does not exist`);
    }

    const canAddToCarrito = await ProductManager.checkStock(productId, quantity);
    if (!canAddToCarrito) {
      throw new Error(`Insufficient stock for product with ID: ${productId}`);
    }

    const carritoData = await CarritoDAO.getCartByUserId(userId);
    const carrito = carritoData || { userId, products: [] };
    const existingItemIndex = carrito.products.findIndex((item) => item.productId === productId);

    if (existingItemIndex !== -1) {
      carrito.products[existingItemIndex].quantity += quantity;
    } else {
      carrito.products.push({ productId, quantity });
    }

    await CarritoDAO.save(carrito, userId);

    return carrito;
  } catch (error) {
    throw new Error('Error adding product to carrito');
  }
};

const removeFromCarrito = async (userId, productId, quantity) => {
  try {
    const carritoData = await CarritoDAO.getCartByUserId(userId);
    const carrito = carritoData || { userId, products: [] };
    const existingItemIndex = carrito.products.findIndex((item) => item.productId === productId);

    if (existingItemIndex !== -1) {
      if (quantity >= carrito.products[existingItemIndex].quantity) {
        carrito.products.splice(existingItemIndex, 1);
      } else {
        carrito.products[existingItemIndex].quantity -= quantity;
      }
    }

    await CarritoDAO.save(carrito, userId);

    return carrito;
  } catch (error) {
    throw new Error('Error removing product from carrito');
  }
};

const emptyCarrito = async (userId) => {
  try {
    await CarritoDAO.deleteCartByUserIdFromRepository(userId);
  } catch (error) {
    throw new Error('Error emptying carrito');
  }
};

const purchaseCarrito = async (userId) => {
  try {
    const carritoData = await CarritoDAO.getCartByUserId(userId);
    const carrito = carritoData || { userId, products: [] };
    const productsToPurchase = [];

    for (const item of carrito.products) {
      const { productId, quantity } = item;
      const canPurchase = await ProductManager.checkStock(productId, quantity);

      if (canPurchase) {
        productsToPurchase.push({ productId, quantity });
      }
    }

    const purchasedProducts = [];

    for (const { productId, quantity } of productsToPurchase) {
      const product = await ProductManager.getProductById(productId);
      product.stock -= quantity;
      await ProductManager.updateProduct(productId, product);
      purchasedProducts.push({ productId, quantity });
    }

    const nonPurchasedProducts = carrito.products.filter(
      (item) => !productsToPurchase.some((product) => product.productId === item.productId)
    );

    carrito.products = nonPurchasedProducts;
    await CarritoDAO.save(carrito, userId);

    return { purchasedProducts, nonPurchasedProducts };
  } catch (error) {
    throw new Error('Error purchasing carrito');
  }
};

export default {
  createCarrito,
  getCarritoByUserId,
  addToCarrito,
  removeFromCarrito,
  emptyCarrito,
  purchaseCarrito,
};
