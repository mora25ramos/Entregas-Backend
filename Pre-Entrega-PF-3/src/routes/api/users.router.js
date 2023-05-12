import { Router } from 'express';
import { authMiddleware, restrictTo } from '../../middlewares/authMiddleware.js';
import UserRepository from '../../repositories/UserRepository.js';

const usersRouter = Router();

// Obtener todos los usuarios (solo para administradores)
usersRouter.get('/', authMiddleware, restrictTo('admin'), async (req, res) => {
  try {
    const users = await UserRepository.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Obtener un usuario por su ID
usersRouter.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await UserRepository.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Actualizar un usuario (solo para administradores)
usersRouter.put('/:id', authMiddleware, restrictTo('admin'), async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const updatedUser = await UserRepository.updateUser(id, userData);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Eliminar un usuario (solo para administradores)
usersRouter.delete('/:id', authMiddleware, restrictTo('admin'), async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserRepository.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default usersRouter;
