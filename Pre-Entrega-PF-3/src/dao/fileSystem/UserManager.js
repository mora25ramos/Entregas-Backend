import UserDTO from '../../dto/UserDTO.js';
import UserRepository from '../../repositories/UserRepository.js';
import bcrypt from 'bcrypt';

export default class UserManager {
    async create(userData) {
        try {
            const newUser = await UserRepository.create(userData);
            return newUser;
        } catch (error) {
            throw new Error('Error al crear usuario');
        }
    }    
    
    async getById(userId) {
        try {
            const userData = await UserRepository.getById(userId);
            const user = UserDTO.fromData(userData);
            return user;
        } catch (error) {
            throw new Error(`Error getting user with ID: ${userId}`);
        }
    }    

    async getByEmail(email) {
        try {
            const userData = await UserRepository.getOne(email);
            const user = UserDTO.fromData(userData);
            return user;
        } catch (error) {
            throw new Error(`Error getting user with email: ${email}`);
        }
    }    

    async update(userId, userData) {
        try {
            const updatedUser = await UserRepository.update(userId, userData);
            return updatedUser;
        } catch (error) {
            throw new Error(`Error updating user with ID: ${userId}`);
        }
    }    

    async delete(userId) {
        try {
            const deletedUser = await UserRepository.delet(userId);
            return deletedUser;
        } catch (error) {
            throw new Error(`Error deleting user with ID: ${userId}`);
        }
    }  

    async comparePasswords(password, hashedPassword) {
        try {
          const match = await bcrypt.compare(password, hashedPassword);
          return match;
        } catch (error) {
          throw new Error('Error comparing passwords');
        }
    }

    async login (email, password) {
        try {
          const user = await this.getByEmail(email);
    
          if (!user || !await this.comparePasswords(password, user.password)) {
            throw new Error('Email o contraseña incorrectos');
          }
    
          // Generar un token de acceso
          const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: '1h' });
    
          // Acà se establece una cookie en la respuesta con el token de acceso
          // la biblioteca cookie-parseranaliza y establece las cookies
          res.cookie('access_token', token, { httpOnly: true, maxAge: 3600000 });
    
          return user;
        } catch (error) {
          throw new Error('Error en el login');
        }
    }
   
    async logout(req, res) {
        try {
          // Invalidar el token de acceso
          const token = req.cookies.access_token;
    
          // se elimina la cookie de acceso
          res.clearCookie('access_token');
          return 'Sesion cerrada con exito';
        } catch (error) {
          throw new Error('Hubo un error durante el cierre de la sesion');
        }
      }    
};