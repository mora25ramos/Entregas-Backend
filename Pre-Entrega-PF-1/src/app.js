import express from 'express';
import __dirname from './utils.js'
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carrito.router.js';

const app = express();

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