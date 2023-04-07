import fs from 'fs';
import path from 'path';

class ProductManager {
  constructor() {
    this.filePath = path.join(process.cwd(), 'src', 'files', 'Products.json');
    this.carrito = {
      productos: [],
      timestamp: '',
    };
  }

  async getById(id) {
    const data = await this.getAll();
    return data.find((producto) => producto.id === id);
  }

  async getAll() {
    try {
      const file = await fs.promises.readFile(this.filePath, 'utf-8');
      return JSON.parse(file);
    } catch (error) {
      await this.save([]);
      return [];
    }
  }

  async addProduct(product) {
    try {
      const data = await fs.readFile(this.filePath);
      const products = JSON.parse(data);
      const newProduct = {
        ...product,
        id: products.length + 1,
      };
      products.push(newProduct);
      await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
      return newProduct;
    } catch (error) {
      throw new Error('Error al agregar el producto');
    }
  }

  async updateProduct(id, product) {
    try {
      const data = await fs.readFile(this.filePath);
      let products = JSON.parse(data);
      const productIndex = products.findIndex((p) => p.id == id);
      if (productIndex < 0) {
        throw new Error('Producto no encontrado');
      }
      products[productIndex] = {
        ...products[productIndex],
        ...product,
        id,
      };
      await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
      return products[productIndex];
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }

  async save(producto) {
    try {
      await fs.promises.writeFile(filePath, JSON.stringify(producto, null, 2));
    } catch (error) {
      console.log('Error al guardar el producto', error);
    }
  }

  async deleteById(id) {
    const data = await this.getAll();
    const index = data.findIndex((producto) => producto.id === id);
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

export default ProductManager;