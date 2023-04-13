import { Router } from 'express';
import { ProductManager } from '../../dao/fileSystem/ProductManager.js';
import { isAdmin } from '../../middlewares/authMiddleware.js';

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
  try {
    const products = await ProductManager.getAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

productsRouter.get('/:id', async (req, res) => {
  try {
    const product = await ProductManager.getProductById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

productsRouter.post('/', isAdmin, async (req, res) => {
  try {
    const product = await ProductManager.addProduct(req.body);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

productsRouter.put('/:id', isAdmin, async (req, res) => {
  try {
    const product = await ProductManager.updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

productsRouter.delete('/:id', isAdmin, async (req, res) => {
  try {
    const product = await ProductManager.deleteProduct(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default productsRouter;