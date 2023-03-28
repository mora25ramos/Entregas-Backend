const express = require('express');
const CarritoManager = require('../manager/CarritoManager');
const ProductManager = require('../manager/ProductManager');

const router = express.Router();

router.post('/', (req, res) => {
  const newCart = CarritoManager.createCart();
  res.json(newCart);
});

router.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  const cart = CarritoManager.getCartById(cartId);
  if (!cart) {
    res.status(404).send(`Cart with id ${cartId} not found`);
  } else {
    res.json(cart);
  }
});

router.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const product = ProductManager.getProductById(productId);

  if (!product) {
    res.status(404).send(`Product with id ${productId} not found`);
  } else {
    try {
      const newProduct = CarritoManager.addProductToCart(cartId, product);
      res.json(newProduct);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
});

module.exports = router;
``