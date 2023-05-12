import mongoose from 'mongoose';
import CartRepository from '../repositories/CartRepository.js';

const { Schema } = mongoose;

const carritoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

carritoSchema.methods.hasSufficientStock = async function () {
  const Product = mongoose.model('Product');
  const promises = this.products.map(async (product) => {
    const { productId, quantity } = product;
    const availableStock = await Product.getAvailableStock(productId);
    return quantity <= availableStock;
  });

  const results = await Promise.all(promises);
  return results.every((result) => result === true);
};

carritoSchema.methods.saveToRepository = function () {
  return CartRepository.saveCart(this);
};

carritoSchema.statics.getCartByUserIdFromRepository = function (userId) {
  return CartRepository.getCartByUserId(userId);
};

carritoSchema.statics.deleteCartByUserIdFromRepository = function (userId) {
  return CartRepository.deleteCartByUserId(userId);
};

const Carrito = mongoose.model('Carrito', carritoSchema);

export default Carrito;