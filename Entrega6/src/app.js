import express from 'express';
import handlebars from 'express-handlebars';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

import cookieParser from 'cookie-parser';
import session from 'express-session';

import connectMongo from 'connect-mongo';
import passport from 'passport';
import mongoose from 'mongoose';
import config from './config.js';
import { localStrategy, jwtStrategy } from './middlewares/authMiddleware.js';


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

// Configurar el middleware para parsear las cookies
app.use(cookieParser());

// Configurar el middleware de sesión
const MongoStore = connectMongo(session);
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
}));

// Configurar Passport
passport.use('local', localStrategy);
passport.use('jwt', jwtStrategy);
app.use(passport.initialize());
app.use(passport.session());


// Configuración de rutas
app.use('/', indexRouter);
app.use('/api', productsRouter);
app.use('/api', carritoRouter);
app.use('/login', loginRouter);
app.use('/users', authMiddleware, usersRouter);

// Manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Configuración de Web Sockets
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');
});

// Inicio del servidor
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});