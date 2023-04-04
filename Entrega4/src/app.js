import express from 'express';
import productosRouter from './routes/api/products.router.js';
import carritoRouter from './routes/api/carrito.router.js';
import __dirname from './utils.js'

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productosRouter);
app.use('/api/carts', carritoRouter);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  console.error(`Server error: ${err}`);
});