import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  nombre: String,
  descripcion: String,
  codigo: String,
  foto: String,
  precio: Number,
  stock: Number
});

const Product = mongoose.model('Product', productSchema);

export default class ProductDAO {
  constructor() {
    mongoose.connect(process.env.MONGO_URI);
    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'connection error:'));
    this.db.once('open', function () {
      console.log('MongoDB Atlas database connection established successfully');
    });
  }

  async get(id) {
    try {
      if (id) {
        return await Product.findById(id);
      } else {
        return await Product.find();
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener productos');
    }
  }

  async add(producto) {
    try {
      const newProduct = new Product(producto);
      return await newProduct.save();
    } catch (error) {
      console.error(error);
      throw new Error('Error al guardar producto');
    }
  }

  async update(id, producto) {
    try {
      await Product.findByIdAndUpdate(id, producto);
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar producto');
    }
  }

  async delete(id) {
    try {
      await Product.findByIdAndDelete(id);
    } catch (error) {
      console.error(error);
      throw new Error('Error al borrar producto');
    }
  }
}