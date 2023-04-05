import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import productsRouter from './routes/api/products.router.js';
import carritoRouter from './routes/api/carrito.router.js';
import viewsRouter from './routes/web/views.router.js';
import  __dirname from './utils.js';
import MessageDAO from './dao/mongoDB/MessageDAO.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Motor de plantillas
app.set('view engine', 'handlebars');

const viewsPath = path.resolve('src', 'views');

app.engine('handlebars', handlebars.engine({ defaultLayout: false }))

// Rutas
app.use('/api/productos', productsRouter);
app.use('/api/carrito', carritoRouter);
app.use('/realTimeProducts', viewsRouter);

// Archivos estáticos
app.use(express.static(path.resolve('public')));

// Conexion a MongoDB
mongoose
  .connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((error) => console.log(`Error al conectar a MongoDB: ${error}`));

// Configuración del servidor
const server = app.listen(8080, ()=> console.log('Listening on port 8080'));
const io = new Server (server);

app.set ('socketio', io);

// Manejo de eventos de Socket.io
io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  // Envío de mensajes al cliente
  const messages = MessageDAO.find();
  socket.emit('messages', messages);

  // Recepción de mensajes del cliente
  socket.on('new-message', async (data) => {
    console.log(data);
    MessageDAO.create(data);
    const messages =  MessageDAO.find();
    io.sockets.emit('messages', messages);
  });
});


