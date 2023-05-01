import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { createUser, getUser, updateUser } from '../../dao/fileSystem/UserManager.js';

const userRouter = Router();

// Crea un nuevo usuario
userRouter.post('/', async (req, res) => {
  try {
    const result = await createUser(req.body);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Obtiene un usuario por su email
userRouter.get('/:email', authMiddleware, async (req, res) => {
  try {
    const user = await getUser(req.params.email);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Actualiza un usuario existente
userRouter.put('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await updateUser(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default userRouter;
