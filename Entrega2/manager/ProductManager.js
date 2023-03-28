const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadProducts();
  }

  addProduct(product) {
    if (!this.validateProduct(product)) {
      throw new Error('Invalid product!');
    }

    if (this.getProductByCode(product.code)) {
      throw new Error('Product code already exists!');
    }

    const newProduct = {
      id: this.getNextProductId(),
      ...product,
    };
    this.products.push(newProduct);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.log('Not found');
    }
    return product;
  }

  updateProduct(id, productFields) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found!');
    }
    const updatedProduct = { ...this.products[productIndex], ...productFields };
    this.products[productIndex] = updatedProduct;
    this.saveProducts();
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found!');
    }
    this.products.splice(productIndex, 1);
    this.saveProducts();
  }

  getProductByCode(code) {
    return this.products.find((p) => p.code === code);
  }

  getNextProductId() {
    if (this.products.length === 0) {
      return 1;
    }
    const lastProduct = this.products[this.products.length - 1];
    return lastProduct.id + 1;
  }

  validateProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return false;
    }
    return true;
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path);
      this.products = JSON.parse(data);
    } catch (error) {
      console.log('Error while loading products:', error);
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.log('Error while saving products:', error);
    }
  }
}

module.exports = ProductManager;