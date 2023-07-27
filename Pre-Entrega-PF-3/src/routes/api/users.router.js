import { Router } from 'express';
import { authMiddleware, adminMiddleware } from '../../middlewares/authMiddleware.js';
import {
  createUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  sendEmailToAdmin,
} from '../../controllers/users.controller.js';

const usersRouter = Router();

// Obtener todos los usuarios (solo para administradores)
usersRouter.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    // Implementar el método para obtener todos los usuarios si es necesario
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Obtener un usuario por su ID
usersRouter.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await getUserByIdController(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Actualizar un usuario (solo para administradores)
usersRouter.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const updatedUser = await updateUserController(id, userData);
    res.json(updatedUser);
    // Notificar al administrador sobre la actualización del usuario
    sendEmailToAdmin('admin@correo.com', 'actualizado', id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Eliminar un usuario (solo para administradores)
usersRouter.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUserController(id);
    res.json(deletedUser);
    // Notificar al administrador sobre la eliminación del usuario
    sendEmailToAdmin('admin@correo.com', 'eliminado', id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default usersRouter;
