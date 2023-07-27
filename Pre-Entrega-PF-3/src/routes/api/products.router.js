import { Router } from 'express';
import { authMiddleware, adminMiddleware } from '../../middlewares/authMiddleware.js';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/products.controller.js';

const productsRouter = Router();

// Obtener todos los productos
productsRouter.get('/', async (req, res) => {
  getAllProducts(req, res);
});

// Obtener un producto por su ID
productsRouter.get('/:id', async (req, res) => {
  getProductById(req, res);
});

// Crear un nuevo producto (solo para administradores)
productsRouter.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  createProduct(req, res);
});

// Actualizar un producto (solo para administradores)
productsRouter.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  updateProduct(req, res);
});

// Eliminar un producto (solo para administradores)
productsRouter.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  deleteProduct(req, res);
});

export default productsRouter;