import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import config from './config.js';
import indexRouter from './routes/index.router.js';
import productsRouter from './routes/products.router.js';
import carritoRouter from './routes/carrito.router.js';
import loginRouter from './routes/login.router.js';
import usersRouter from './routes/users.router.js';
import userService from './services/user.service.js';
import productService from './services/product.service.js';
import carritoService from './services/carrito.service.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

// Configuración del servidor
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

// Configuración de las variables de entorno
config.load();

// Implementación opcional de Factory para seleccionar el DAO
let daoOption = process.argv.find((arg) => arg.includes('--dao='));
if (daoOption) {
  daoOption = daoOption.split('=')[1];
}

// Configuración de rutas
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/cart', carritoRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/users', userService);
app.use('/products', productService);
app.use('/cart', carritoService);

// Middleware de manejo de errores
app.use(errorHandler);

// Inicio del servidor
httpServer.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});