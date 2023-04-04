import fs from 'fs/promises';
import path from 'path';
import Utils from '../utils.js';

class ProductManager {
  filePath = path.join(Utils.__dirname, 'files', 'Products.json');

  async getAllProducts() {
    try {
      const data = await fs.readFile(this.filePath);
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  }

  async getProductById(id) {
    try {
      const data = await fs.readFile(this.filePath);
      const products = JSON.parse(data);
      const product = products.find((p) => p.id == id);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product;
    } catch (error) {
      throw new Error('Error al obtener el producto');
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

  async deleteProduct(id) {
    try {
      const data = await fs.readFile(this.filePath);
      let products = JSON.parse(data);
      products = products.filter((p) => p.id != id);
      await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
      return { message: 'Producto eliminado exitosamente' };
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }
}

export default ProductManager;
