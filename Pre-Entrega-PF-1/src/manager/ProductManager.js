import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import utils from '../utils.js';

const { __dirname } = utils;

const productsPath = path.join(__dirname, '..', 'files', 'Products.json');

class ProductManager {
  static getAll() {
    const data = fs.readFileSync(productsPath, 'utf8');
    return JSON.parse(data);
  }

  static getById(id) {
    const data = fs.readFileSync(productsPath, 'utf8');
    const products = JSON.parse(data);
    return products.find((product) => product.id === id);
  }

  static add(product) {
    const data = fs.readFileSync(productsPath, 'utf8');
    const products = JSON.parse(data);
    const newProduct = {
      id: uuidv4(),
      ...product,
    };
    products.push(newProduct);
    fs.writeFileSync(productsPath, JSON.stringify(products));
    return newProduct;
  }

  static updateById(id, product) {
    const data = fs.readFileSync(productsPath, 'utf8');
    let products = JSON.parse(data);
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return null;
    }
    const updatedProduct = {
      id,
      ...product,
    };
    products[productIndex] = updatedProduct;
    fs.writeFileSync(productsPath, JSON.stringify(products));
    return updatedProduct;
  }

  static deleteById(id) {
    const data = fs.readFileSync(productsPath, 'utf8');
    let products = JSON.parse(data);
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return false;
    }
    products.splice(productIndex, 1);
    fs.writeFileSync(productsPath, JSON.stringify(products));
    return true;
  }
}

export default ProductManager;