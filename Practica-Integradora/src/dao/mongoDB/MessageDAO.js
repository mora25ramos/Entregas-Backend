import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  email: { type: String, required: true, max: 100 },
  timestamp: { type: String, required: true, max: 100 },
  message: { type: String, required: true, max: 500 },
});

const Message = mongoose.model('messages', messageSchema);

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