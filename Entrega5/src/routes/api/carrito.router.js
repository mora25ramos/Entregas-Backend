import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import CarritoManager from '../../dao/fileSystem/CarritoManager.js';

const carritoRouter = Router();

// Obtiene el carrito de un usuario específico
carritoRouter.get('/:username', authMiddleware, async (req, res) => {
  try {
    const carritoManager = new CarritoManager();
    const carrito = await carritoManager.getCarritoByUsername(req.params.username);
    res.json(carrito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Agrega un producto al carrito de un usuario
carritoRouter.post('/:username', authMiddleware, async (req, res) => {
  const { productId, cantidad } = req.body;
  try {
    const carritoManager = new CarritoManager();
    const carrito = await carritoManager.agregarProducto(req.params.username, productId, cantidad);
    res.json(carrito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Elimina un producto del carrito de un usuario
carritoRouter.delete('/:username/:productId', authMiddleware, async (req, res) => {
  try {
    const carritoManager = new CarritoManager();
    const carrito = await carritoManager.eliminarProducto(req.params.username, req.params.productId);
    res.json(carrito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default carritoRouter;