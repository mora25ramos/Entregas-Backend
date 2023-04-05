import { Product } from '../models/Product.js'

export default class ProductDAO {
  constructor() {
    mongoose.connect(process.env.MONGO_URI);
    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'connection error:'));
    this.db.once('open', function () {
      console.log('MongoDB Atlas database connection established successfully');
    });
  }

  async getById(id) {
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

  async deleteById(id) {
    try {
      await Product.findByIdAndDelete(id);
    } catch (error) {
      console.error(error);
      throw new Error('Error al borrar producto');
    }
  }
}