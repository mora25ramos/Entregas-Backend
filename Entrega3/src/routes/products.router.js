const express = require('express');
const router = express.Router();
const ProductManager = require('../manager/ProductManager');

const productManager = new ProductManager();

// GET /products?limit=5
router.get('/', (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts();
  
  if (limit) {
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});

// GET /products/:id
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  const product = productManager.getProductById(productId);
  
  if (!product) {
    res.status(404).send('Producto no encontrado');
  } else {
    res.json(product);
  }
});

module.exports = router;