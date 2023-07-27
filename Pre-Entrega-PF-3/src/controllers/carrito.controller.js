import CarritoService from '../services/carritoService.js';
import CarritoRepository from '../repositories/CartRepository.js';

const carritoController = {};

// Obtener el carrito de un usuario por su ID
carritoController.getCarritoByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const carrito = await CarritoService.getCarritoByUserId(userId);
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ message: 'Error getting carrito' });
  }
};

// Agregar un producto al carrito de un usuario
carritoController.addToCarrito = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    const carrito = await CarritoService.addToCarrito(userId, productId, quantity);
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to carrito' });
  }
};

// Eliminar un producto del carrito de un usuario
carritoController.removeFromCarrito = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    const carrito = await CarritoService.removeFromCarrito(userId, productId, quantity);
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from carrito' });
  }
};

// Vaciar el carrito de un usuario
carritoController.emptyCarrito = async (req, res) => {
  try {
    const { userId } = req.params;
    await CarritoService.emptyCarrito(userId);
    res.json({ message: 'Carrito emptied successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error emptying carrito' });
  }
};

// Realizar la compra del carrito de un usuario
carritoController.finalizarCompra = async (req, res) => {
  const { cid } = req.params;
  const userId = req.user.id;

  try {
    const result = await CarritoRepository.finalizarCompra(userId, cid);
    res.json(result);
  } catch (error) {
    console.error('Error al finalizar la compra:', error);
    res.status(500).json({ message: 'Error al finalizar la compra' });
  }
};

export default carritoController;