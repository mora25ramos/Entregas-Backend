import mongoose from 'mongoose';

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

// Agregamos un método estático para obtener el stock disponible de un producto por su ID
productSchema.statics.getAvailableStock = async function (productId) {
  const product = await this.findById(productId);
  return product ? product.stock : 0;
};

const Product = mongoose.model('Product', productSchema);

export default Product;
