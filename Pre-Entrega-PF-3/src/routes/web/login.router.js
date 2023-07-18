import { Router } from 'express';
import login from '../../dao/fileSystem/UserManager.js';

const loginRouter = Router();

// Ruta para iniciar sesión
loginRouter.post('/login', login);


export { loginRouter };