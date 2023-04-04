import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  email: { type: String, required: true },
  mensaje: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Message = mongoose.model('Message', messageSchema);