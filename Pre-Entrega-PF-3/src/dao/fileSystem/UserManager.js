import UserDAO from '../dao/UserDAO.js';
import UserDTO from '../dto/UserDTO.js';
import UserRepository from '../repositories/UserRepository.js';
import bcrypt from 'bcrypt';

class UserManager {
    async createUser(userData) {
        try {
            const newUser = await UserRepository.create(userData);
            return newUser;
        } catch (error) {
            throw new Error('Error creating user');
        }
    }    
    
    async getUserById(userId) {
        try {
            const userData = await UserRepository.getById(userId);
            const user = UserDTO.fromData(userData);
            return user;
        } catch (error) {
            throw new Error(`Error getting user with ID: ${userId}`);
        }
    }    

    async getUserByEmail(email) {
        try {
            const userData = await UserRepository.getByEmail(email);
            const user = UserDTO.fromData(userData);
            return user;
        } catch (error) {
            throw new Error(`Error getting user with email: ${email}`);
        }
    }    

    async updateUser(userId, userData) {
        try {
            const updatedUser = await UserRepository.update(userId, userData);
            return updatedUser;
        } catch (error) {
            throw new Error(`Error updating user with ID: ${userId}`);
        }
    }    

    async deleteUser(userId) {
        try {
            const deletedUser = await UserRepository.delete(userId);
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
}

export default new UserManager();