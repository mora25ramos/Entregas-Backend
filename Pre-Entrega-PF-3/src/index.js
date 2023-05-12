import express from 'express';
import dotenv from 'dotenv';
import config from './config.js';
import { connectDB } from './db/db.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import ticketRouter from './routes/ticketRouter.js';

dotenv.config();

const app = express();

// Configuración de variables de entorno
config();

// Conexión a la base de datos
connectDB();

// Middleware para manejar el cuerpo de las peticiones
app.use(express.json());

// Rutas
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/tickets', ticketRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Puerto de escucha del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});