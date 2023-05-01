//Este archivo define la ruta para el inicio de sesión de los usuarios y se encarga de autenticar al usuario y generar un token JWT si las credenciales son válidas.
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { compareSync } from 'bcrypt';
import userDAO from '../../dao/mongoDB/userDAO.js';
import { getDB } from '../../db/db.js';
import { jwtClaveSecreta } from '../../config.js';

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  try {
    const userCollection = getDB().collection('users');
    const { email, password } = req.body;

    const user = await userDAO.getUserByEmail(email);

    if (!user) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }

    const passwordMatches = compareSync(password, user.password);

    if (!passwordMatches) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }

    const token = jwt.sign({ user }, jwtClaveSecreta);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

export default loginRouter;