import Message from '../models/Message.js'

export default class MessageDAO {
  static async add(message) {
    try {
      const newMessage = new Message({
        email: message.email,
        timestamp: message.timestamp,
        message: message.message,
      });
      await newMessage.save();
      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      const messages = await Message.find();
      return messages;
    } catch (error) {
      throw error;
    }
  }
}