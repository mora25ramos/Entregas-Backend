import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

class ProductManager {
  constructor() {
    this.productsFilePath = path.join(__dirname, '../files/Products.json');
  }

  async getAll() {
    try {
      const products = await fs.promises.readFile(this.productsFilePath, 'utf-8');
      return JSON.parse(products);
    } catch (error) {
      console.log('Error:', error);
      return [];
    }
  }

  async getById(id) {
    const products = await this.getAll();
    return products.find((product) => product.id === id);
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

  async save(product) {
    const products = await this.getAll();
    const newProduct = { ...product, id: Date.now().toString() };
    products.push(newProduct);
    await fs.promises.writeFile(this.productsFilePath, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async updateProduct(id, updatedProduct) {
    const products = await this.getAll();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return null;
    }
    const productToUpdate = products[productIndex];
    const updatedProductWithId = { ...updatedProduct, id };
    products[productIndex] = updatedProductWithId;
    await fs.promises.writeFile(this.productsFilePath, JSON.stringify(products, null, 2));
    return updatedProductWithId;
  }

  async deleteProduct(id) {
    const products = await this.getAll();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return null;
    }
    const productToDelete = products[productIndex];
    products.splice(productIndex, 1);
    await fs.promises.writeFile(this.productsFilePath, JSON.stringify(products, null, 2));
    return productToDelete;
  }
}

export default ProductManager;
