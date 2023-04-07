import { Carrito } from '../models/Carrito.js'

export default class CarritoDAO {
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
        return await Carrito.findById(id);
      } else {
        return await Carrito.find();
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener carritos');
    }
  }

  async add(producto, id) {
    try {
      let carrito = null;
      if (id) {
        carrito = await this.get(id);
        carrito.products.push(producto);
      } else {
        carrito = new Carrito({
          products: [producto]
        });
      }
      return await carrito.save(); 
    } catch (error) {
      console.error(error);
      throw new Error('Error al guardar carrito');
    }
  }
  

  async delete(id) {
    try {
      await Carrito.findByIdAndDelete(id);
    } catch (error) {
      console.error(error);
      throw new Error('Error al borrar carrito');
    }
  }
}