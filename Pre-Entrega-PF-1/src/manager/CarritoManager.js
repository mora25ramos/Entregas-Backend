import fs from 'fs';
import path from 'path';
import utils from '../utils.js';

const carritoPath = path.join(utils.__dirname, '../files', 'Carrito.json');

class CarritoManager {
  // Función para obtener todos los carritos
  async getAll() {
    try {
      const carritos = await fs.promises.readFile(carritoPath, 'utf-8');
      return JSON.parse(carritos);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // Función para obtener un carrito por id
  async getById(id) {
    try {
      const carritos = await this.getAll();
      const carrito = carritos.find((c) => c.id === id);
      return carrito;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Función para crear un nuevo carrito
  async create() {
    try {
      const carritos = await this.getAll();
      const newCarrito = { id: utils.generateId(), products: [] };
      carritos.push(newCarrito);
      await fs.promises.writeFile(carritoPath, JSON.stringify(carritos, null, 2));
      return newCarrito;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Función para agregar un producto a un carrito
  async addProduct(id, product, quantity) {
    try {
      const carritos = await this.getAll();
      const carritoIndex = carritos.findIndex((c) => c.id === id);

      if (carritoIndex === -1) return null;

      const productIndex = carritos[carritoIndex].products.findIndex((p) => p.product === product);

      if (productIndex === -1) {
        const newProduct = { product, quantity };
        carritos[carritoIndex].products.push(newProduct);
      } else {
        carritos[carritoIndex].products[productIndex].quantity += quantity;
      }

      await fs.promises.writeFile(carritoPath, JSON.stringify(carritos, null, 2));
      return carritos[carritoIndex];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new CarritoManager();