const fs = require('fs');
const path = require('path');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    const data = fs.readFileSync(this.filePath, 'utf-8');
    this.products = data ? JSON.parse(data) : [];
  }

  getProducts(limit) {
    return limit ? this.products.slice(0, limit) : this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  addProduct(product) {
    if (!product || !product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      throw new Error('Faltan datos obligatorios');
    }

    if (this.products.some((p) => p.code === product.code)) {
      throw new Error('Ya existe un producto con ese código');
    }

    const newProduct = {
      ...product,
      id: this.products.length + 1,
    };

    this.products.push(newProduct);

    fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, '\t'));

    return newProduct;
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new Error('Producto no encontrado');
    }

    const deletedProduct = this.products.splice(index, 1)[0];

    fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, '\t'));

    return deletedProduct;
  }

  updateProduct(id, product) {
    const index = this.products.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new Error('Producto no encontrado');
    }

    const updatedProduct = {
      ...this.products[index],
      ...product,
      id,
    };

    this.products[index] = updatedProduct;

    fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, '\t'));

    return updatedProduct;
  }
}

module.exports = ProductManager;