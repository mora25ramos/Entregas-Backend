import express from 'express';
const router = express.Router();
import ProductManager from '../manager/ProductManager.js';

const productManager = new ProductManager();

router.get('/', (req, res) => {
  const products = productManager.getProducts();
  res.json(products);
});

router.get('/:pid', (req, res) => {
  const product = productManager.getProductById(req.params.pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

router.post('/', (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnail } = req.body;
  if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const product = productManager.addProduct(title, description, code, price, status, stock, category, thumbnail);
  res.status(201).json(product);
});

router.put('/:pid', (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnail } = req.body;
  if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const updatedProduct = productManager.updateProduct(req.params.pid, title, description, code, price, status, stock, category, thumbnail);
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

router.delete('/:pid', (req, res) => {
  const deletedProduct = productManager.deleteProduct(req.params.pid);
  if (deletedProduct) {
    res.json(deletedProduct);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

export default router;
