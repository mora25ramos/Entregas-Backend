import express from 'express';
import handlebars from 'express-handlebars';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

import cookieParser from 'cookie-parser';
import session from 'express-session';

//import de rutas
import { authMiddleware } from './middlewares/authMiddleware.js';
import productsRouter from './routes/api/products.router.js';
import carritoRouter from './routes/api/carrito.router.js';
import usersRouter from './routes/api/users.router.js';
import indexRouter from "./routes/web/index.router.js";
import loginRouter from './routes/web/login.router.js';

// Definición de constantes y variables
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
const io = new Server(server);
dotenv.config();


// Configuración de handlebars como template engine
app.engine('handlebars', handlebars.engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Configuración de middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('pubic'));
app.use(cookieParser());
app.use(session({
  secret: 'Mora2002', 
  resave: false,
  saveUninitialized: false
}));

// Configuración de rutas
app.use('/', indexRouter);
app.use('/api', productsRouter);
app.use('/api', carritoRouter);
app.use('/login', loginRouter);
app.use('/users', authMiddleware, usersRouter);


// Configuración de Web Sockets
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');
});

// Inicio del servidor
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});