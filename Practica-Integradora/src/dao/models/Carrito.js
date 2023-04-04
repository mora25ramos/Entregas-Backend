import mongoose from 'mongoose';

const carritoSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  products: { type: Array, required: true },
});

const Carrito = mongoose.model('Carrito', carritoSchema);

export default Carrito