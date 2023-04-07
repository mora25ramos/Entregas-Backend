import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import __dirname from './utils.js'
import productsRouter from './routes/api/products.router.js';
import carritoRouter from './routes/api/carrito.router.js';
import viewsRouter from './routes/web/views.router.js';

// Definición de constantes y variables
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 8080;

// Configuración de handlebars como template engine
app.engine('handlebars', handlebars.engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');

// Configuración de middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuración de rutas
// Rutas
app.use('/api/productos', productsRouter);
app.use('/api/carrito', carritoRouter);
app.use('/realTimeProducts', viewsRouter);

// Configuración de Web Sockets
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');
});

// Inicio del servidor
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});