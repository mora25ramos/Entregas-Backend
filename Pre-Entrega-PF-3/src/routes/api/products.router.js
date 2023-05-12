import { Router } from 'express';
import { authMiddleware, restrictTo } from '../../middlewares/authMiddleware.js';
import ProductRepository from '../../repositories/ProductRepository.js';

const productsRouter = Router();

// Obtener todos los productos
productsRouter.get('/', async (req, res) => {
  try {
    const products = await ProductRepository.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Obtener un producto por su ID
productsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductRepository.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Crear un nuevo producto (solo para administradores)
productsRouter.post('/', authMiddleware, restrictTo('admin'), async (req, res) => {
  const productData = req.body;
  try {
    const createdProduct = await ProductRepository.addProduct(productData);
    res.json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Actualizar un producto (solo para administradores)
productsRouter.put('/:id', authMiddleware, restrictTo('admin'), async (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  try {
    const updatedProduct = await ProductRepository.updateProduct(id, productData);
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Eliminar un producto (solo para administradores)
productsRouter.delete('/:id', authMiddleware, restrictTo('admin'), async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await ProductRepository.deleteProduct(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default productsRouter;