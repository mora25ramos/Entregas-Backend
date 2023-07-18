import express from 'express';
import handlebars from 'express-handlebars';
import dotenv from 'dotenv';
import http from 'http';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import config from './config.js';

// Importar middlewares
import { authMiddleware } from './middlewares/authMiddleware.js'; 
import configurePassport from './middlewares/passportMiddleware.js';

// Importar rutas
import carritoRouter from './routes/api/carrito.router.js';
import productsRouter from './routes/api/products.router.js';
import usersRouter from './routes/api/users.router.js';
import profileRouter from './routes/web/profile.router.js';
import indexRouter from './routes/web/index.router.js';
import { loginRouter } from './routes/web/login.router.js';
import { logoutRouter } from './routes/web/logout.router.js';
import userService from './services/userService.js';
import productService from './services/productService.js';
import * as carritoService from './services/carritoService.js';

dotenv.config();

// Definición de constantes y variables
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 8080;


// Configuración de handlebars como templates
app.engine('handlebars', handlebars.engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Configurar Passport
const passport = configurePassport(app);

// Factory para seleccionar el DAO
let daoOption = process.argv.find((arg) => arg.includes('--dao='));
if (daoOption) {
  daoOption = daoOption.split('=')[1];
}

// Configuración de rutas
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/cart', carritoRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use ('/logout', logoutRouter);
app.use('/users', authMiddleware, usersRouter);
app.use('/profile', profileRouter);

// Manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salio mal!');
});

// Configuración de Web Sockets
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');
});

//Conexion a Mongoose
mongoose.connect(config.mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Conectado a la base de datos');
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
});

// Inicio del servidor
server.listen(8080, () => {
  console.log('Server listening on port 8080');
});