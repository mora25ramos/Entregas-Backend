const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const ProductManager = require('../manager/ProductManager.js');

const router = express.Router();

const productsFilePath = path.join(__dirname, '..', 'files', 'Products.json');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'img'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  const products = ProductManager.getProducts();
  res.json(products);
});

router.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = ProductManager.getProductById(productId);
  if (!product) {
    res.status(404).send(`Product with id ${productId} not found`);
  } else {
    res.json(product);
  }
});

router.post('/', upload.array('thumbnails', 4), (req, res) => {
  const productData = req.body;
  const thumbnails = req.files.map(file => `/img/${file.filename}`);
  productData.thumbnails = thumbnails;

  try {
    const newProduct = ProductManager.addProduct(productData);
    res.json(newProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const productData = req.body;

  try {
    const updatedProduct = ProductManager.updateProduct(productId, productData);
    if (!updatedProduct) {
      res.status(404).send(`Product with id ${productId} not found`);
    } else {
      res.json(updatedProduct);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:pid', (req, res) => {
  const productId = req.params.pid;

  try {
    ProductManager.deleteProduct(productId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
