const express = require('express');
const ProductManager = require('./manager/ProductManager');
const productsRouter = require('./routes/products.router');

const app = express();
const port = 3000;

const productManager = new ProductManager('./files/Products.json');

app.use(express.json());

app.use('/products', productsRouter(productManager));

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
