import fs from 'fs';
import path from 'path';

class CarritoManager {
  constructor(carritoFilePath) {
    this.carritoFilePath = carritoFilePath;
    this.carrito = {
      products: [],
      totalPrice: 0,
    };
    this.load();
  }

  load() {
    try {
      const data = fs.readFileSync(this.carritoFilePath, 'utf-8');
      if (data) {
        this.carrito = JSON.parse(data);
      }
    } catch (err) {
      console.log(`Error while loading carrito data: ${err}`);
    }
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
      this.carrito.products.push(data);
      this.carrito.timestamp = new Date().toLocaleString();
      await fs.promises.writeFile(this.filePath, JSON.stringify(this.carrito, null, '\t'));
      console.log('Carrito guardado exitosamente!');
    } catch (error) {
      console.error('Error al guardar el carrito:', error);
    }
  }

  get() {
    return this.carrito;
  }

  add(product) {
    this.carrito.products.push(product);
    this.carrito.totalPrice += product.price;
    this.save();
  }

  delete(id) {
    const index = this.carrito.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      const product = this.carrito.products[index];
      this.carrito.products.splice(index, 1);
      this.carrito.totalPrice -= product.price;
      this.save();
      return true;
    }
    return false;
  }

  checkout() {
    this.carrito = {
      products: [],
      totalPrice: 0,
    };
    this.save();
  }
}

export default CarritoManager;
