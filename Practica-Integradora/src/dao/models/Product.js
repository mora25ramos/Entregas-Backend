import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  codigo: { type: String, required: true },
  foto: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

export default Product