import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

const profileRouter = Router();

// Ruta para el perfil de usuario
profileRouter.get('/profile', authMiddleware, (req, res) => {
  res.render('profile', { user: req.user });
});

export default profileRouter;