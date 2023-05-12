import express from 'express';
import handlebars from 'express-handlebars';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import config from './config.js';

// Importar middlewares
import configureMiddlewares from './middlewares/middlewares.js';
import configurePassport from './middlewares/passport.js';

// Importar rutas
import { authMiddleware } from './middlewares/authMiddleware.js';
import carritoRouter from './routes/api/carrito.router.js';
import productsRouter from './routes/api/products.router.js';
import userRouter from './routes/api/users.router.js';
import profileRouter from './routes/web/profile.router.js';
import indexRouter from './routes/web/index.router.js';
import loginRouter from './routes/web/login.router.js';

// Importar sockets
import configureSockets from './sockets.js';

// Definición de constantes y variables
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 8080;

// Configuración de handlebars como template engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Configuración de middlewares
configureMiddlewares(app);

// Configurar Passport
const passport = configurePassport(app);

// Configuración de rutas
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/cart', carritoRouter);
app.use('/login', loginRouter);
app.use('/users', authMiddleware, userRouter);
app.use('/profile', profileRouter);

// Manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Configuración de Web Sockets
configureSockets(io);

mongoose.connect(config.mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database connected');
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
});
