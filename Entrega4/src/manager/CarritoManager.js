import path from 'path';
import fs from 'fs';

class CarritoManager {
  constructor() {
    this.filePath = path.join(process.cwd(), 'src', 'files', 'Carrito.json');
    this.carrito = {
      productos: [],
      timestamp: '',
    };
  }

  async save(data) {
    try {
      const fileExists = fs.existsSync(this.filePath);
      if (fileExists) {
        const fileContent = await fs.promises.readFile(this.filePath, 'utf-8');
        if (fileContent) {
          this.carrito = JSON.parse(fileContent);
        }
      }
      this.carrito.productos.push(data);
      this.carrito.timestamp = new Date().toLocaleString();
      await fs.promises.writeFile(this.filePath, JSON.stringify(this.carrito, null, '\t'));
      console.log('Carrito guardado exitosamente!');
    } catch (error) {
      console.error('Error al guardar el carrito:', error);
    }
  }

  async get(id) {
    try {
      const fileContent = await fs.promises.readFile(this.filePath, 'utf-8');
      if (fileContent) {
        const carrito = JSON.parse(fileContent);
        if (id) {
          const product = carrito.productos.find((item) => item.id === id);
          if (!product) {
            throw new Error(`No se encontró el producto con id ${id}`);
          }
          return product;
        }
        return carrito;
      }
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
    }
  }

  async delete(id) {
    try {
      const fileContent = await fs.promises.readFile(this.filePath, 'utf-8');
      if (fileContent) {
        const carrito = JSON.parse(fileContent);
        const index = carrito.productos.findIndex((item) => item.id === id);
        if (index === -1) {
          throw new Error(`No se encontró el producto con id ${id}`);
        }
        carrito.productos.splice(index, 1);
        carrito.timestamp = new Date().toLocaleString();
        await fs.promises.writeFile(this.filePath, JSON.stringify(carrito, null, '\t'));
        console.log(`Producto con id ${id} eliminado exitosamente del carrito!`);
      }
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  }
}

export default CarritoManager;