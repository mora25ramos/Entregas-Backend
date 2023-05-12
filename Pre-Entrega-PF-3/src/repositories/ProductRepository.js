import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

export default class ProductRepository {
  async getAll() {
    const products = await Product.find({});
    return products;
  }

  async getById(id) {
    const product = await Product.findById(id);
    return product;
  }

  async create(productData) {
    const product = new Product(productData);
    await product.save();
    return product;
  }

  async update(id, productData) {
    const product = await Product.findByIdAndUpdate(id, productData, { new: true });
    return product;
  }

  async delete(id) {
    const product = await Product.findByIdAndDelete(id);
    return product;
  }
}