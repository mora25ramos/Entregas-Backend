import mongoose from 'mongoose';
import ProductRepository from '../repositories/ProductRepository.js';

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.statics.getAvailableStock = async function (productId) {
  const product = await ProductRepository.getById(productId);
  return product ? product.stock : 0;
};

const Product = mongoose.model('Product', productSchema);

export default Product;