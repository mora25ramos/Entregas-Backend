import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware.js';

const router = express.Router();

// Ruta para el perfil de usuario
router.get('/profile', authMiddleware, (req, res) => {
  res.render('profile', { user: req.user });
});

export default profileRouter;