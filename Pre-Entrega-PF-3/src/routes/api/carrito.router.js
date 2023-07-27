import { Router } from 'express';
import { authMiddleware, adminMiddleware } from '../../middlewares/authMiddleware.js';
import carritoController from '../../controllers/carrito.controller.js'; // No se necesita crear una instancia, simplemente importar el controlador directamente

const carritoRouter = Router();

// Obtiene el carrito de un usuario específico
carritoRouter.get('/:username', authMiddleware, async (req, res) => {
  try {
    const carrito = await carritoController.getCarritoByUserId(req.params.username); // Cambiar el método al que se hace referencia
    res.render('carrito', { carrito }); // Renderiza la plantilla "carrito.handlebars" con los datos del carrito
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Agrega un producto al carrito de un usuario
carritoRouter.post('/:username', authMiddleware, async (req, res) => {
  const { productId, cantidad } = req.body;
  try {
    const carrito = await carritoController.addToCarrito(req.params.username, productId, cantidad); // Cambiar el método al que se hace referencia
    res.render('carrito', { carrito }); // Renderiza la plantilla "carrito.handlebars" con los datos del carrito actualizado
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Elimina un producto del carrito de un usuario
carritoRouter.delete('/:username/:productId', authMiddleware, async (req, res) => {
  try {
    const carrito = await carritoController.removeFromCarrito(req.params.username, req.params.productId); // Cambiar el método al que se hace referencia
    res.render('carrito', { carrito }); // Renderiza la plantilla "carrito.handlebars" con los datos del carrito actualizado
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Ruta para finalizar la compra de un carrito
carritoRouter.post('/:cid/purchase', authMiddleware, carritoController.finalizarCompra); // No es necesario usar "CarritoController." aquí

export default carritoRouter;