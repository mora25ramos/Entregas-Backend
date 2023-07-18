import { Router } from 'express';
import logout from '../../dao/fileSystem/UserManager.js';

const logoutRouter = Router();

// Ruta para cerrar sesión
logoutRouter.post('/logout', logout);

export { logoutRouter } 