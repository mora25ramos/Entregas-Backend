import mongoose from 'mongoose';

const carritoSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  products:[{ 
    _id: String, 
    timestamp: Number, 
    nombre: String, 
    descripcion: String, 
    codigo: String, 
    foto: String, 
    precio: Number, 
    stock: Number 
  }]
});

const Carrito = mongoose.model('Carrito', carritoSchema);

export default Carrito;


