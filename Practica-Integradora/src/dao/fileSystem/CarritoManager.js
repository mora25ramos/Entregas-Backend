import fs from 'fs';
import path from 'path';

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
  
  async getById(id) {
    const data = await this.getAll();
    return data.find((carrito) => carrito.id === id);
  }

  async getAll() {
    try {
      const file = await fs.promises.readFile(filePath, 'utf-8');
      return JSON.parse(file);
    } catch (error) {
      await this.save([]);
      return [];
    }
  }

  async addCarrito(carrito) {
    try {
      const data = await fs.readFile(this.filePath);
      const carritos = JSON.parse(data);
      const newCarrito = {
        ...carrito,
        id: carritos.length + 1,
      };
      carritos.push(newCarrito);
      await fs.writeFile(this.filePath, JSON.stringify(carritos, null, 2));
      return newCarrito;
    } catch (error) {
      throw new Error('Error al agregar el carrito');
    }
  }

  async updateCarrito(id, carrito) {
    try {
      const data = await fs.readFile(this.filePath);
      let carritos = JSON.parse(data);
      const carritoIndex = carritos.findIndex((p) => p.id == id);
      if (carritoIndex < 0) {
        throw new Error('Carrito no encontrado');
      }
      carritos[carritoIndex] = {
        ...carritos[carritoIndex],
        ...carrito,
        id,
      };
      await fs.writeFile(this.filePath, JSON.stringify(carritos, null, 2));
      return carritos[carritoIndex];
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }

  async save(carrito) {
    try {
      await fs.promises.writeFile(filePath, JSON.stringify(carrito, null, 2));
    } catch (error) {
      console.log('Error al guardar el carrito', error);
    }
  }

  async deleteById(id) {
    const data = await this.getAll();
    const index = data.findIndex((carrito) => carrito.id === id);
    if (index !== -1) {
      data.splice(index, 1);
      await this.save(data);
      return true;
    }
    return false;
  }

  async deleteAll() {
    await this.save([]);
  }
}

export default CarritoManager;