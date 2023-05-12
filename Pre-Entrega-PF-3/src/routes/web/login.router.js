import express from 'express';
import { login, logout } from '../controllers/login.controller.js';

const loginRouter = express.Router();

// Ruta para iniciar sesión
loginRouter.post('/', login);

// Ruta para cerrar sesión
loginRouter.post('/logout', logout);

export default loginRouter;