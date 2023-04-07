import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const carritoSchema = new Schema({
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  totalPrice: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Carrito = mongoose.model('Carrito', carritoSchema);
export default Carrito;