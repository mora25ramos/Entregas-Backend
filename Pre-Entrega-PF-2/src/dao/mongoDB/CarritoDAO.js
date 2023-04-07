import Carrito from '../models/Carrito.js';
import { ObjectId } from 'mongodb';
import { getDB } from '../db/mongoDB';

class CarritoDAO {
  async getCarrito() {
    const db = getDB();
    const carrito = await db.collection('carrito').findOne({});
    return carrito || new Carrito();
  }

  async addProducto(id) {
    const db = getDB();
    const carrito = await this.getCarrito();

    const productoIndex = carrito.productos.findIndex((p) => p._id.toString() === id.toString());

    if (productoIndex !== -1) {
      carrito.productos[productoIndex].cantidad += 1;
    } else {
      const producto = await db.collection('productos').findOne({ _id: ObjectId(id) });

      if (producto) {
        carrito.productos.push({
          ...producto,
          cantidad: 1,
        });
      }
    }

    return db.collection('carrito').updateOne({}, { $set: carrito }, { upsert: true });
  }

  async deleteProducto(id) {
    const db = getDB();
    const carrito = await this.getCarrito();

    const productosFiltrados = carrito.productos.filter((p) => p._id.toString() !== id.toString());

    carrito.productos = productosFiltrados;

    return db.collection('carrito').updateOne({}, { $set: carrito }, { upsert: true });
  }
}

export default new CarritoDAO();