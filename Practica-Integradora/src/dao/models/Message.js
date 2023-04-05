import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  email: { type: String, required: true, max: 100 },
  message: { type: String, required: true, max: 500 },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;