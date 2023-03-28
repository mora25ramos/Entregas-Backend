const express = require('express');
const app = express();
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carrito.router.js');

// Parse application/json and application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Products routes
app.use('/api/products', productsRouter);

// Carts routes
app.use('/api/cart', cartsRouter);

// Start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});