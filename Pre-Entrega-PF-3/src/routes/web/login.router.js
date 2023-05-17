import express from 'express';
import login from '../../dao/fileSystem/UserManager.js';
import logout from '../../dao/fileSystem/UserManager.js';

const loginRouter = express.Router();
const logoutRouter = express.Router();

// Ruta para iniciar sesión
loginRouter.post('/', login);

// Ruta para cerrar sesión
loginRouter.post('/logout', logout);

export default {
    loginRouter,
    logoutRouter
} 