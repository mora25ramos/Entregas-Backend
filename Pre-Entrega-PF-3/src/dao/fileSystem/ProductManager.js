import ProductRepository from '../../repositories/ProductRepository.js';
import { ProductoDTO } from '../../dto/productDTO.js';

class ProductManager {
  async getAllProducts() {
    try {
      const productsData = await ProductRepository.getAll();
      const products = productsData.map((productData) => ProductoDTO.fromData(productData));
      return products;
    } catch (error) {
      throw new Error('Error getting all products');
    }
  }

  async getProductById(productId) {
    try {
      const productData = await ProductRepository.getById(productId);
      const product = ProductoDTO.fromData(productData);
      return product;
    } catch (error) {
      throw new Error(`Error getting product with ID: ${productId}`);
    }
  }

  async addProduct(productData) {
    try {
      const newProductData = await ProductRepository.create(productData);
      const newProduct = ProductoDTO.fromData(newProductData);
      return newProduct;
    } catch (error) {
      throw new Error('Error adding product');
    }
  }

  async updateProduct(productId, productData) {
    try {
      const updatedProductData = await ProductRepository.update(productId, productData);
      const updatedProduct = ProductoDTO.fromData(updatedProductData);
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error updating product with ID: ${productId}`);
    }
  }

  async deleteProduct(productId) {
    try {
      const deletedProductData = await ProductRepository.delete(productId);
      const deletedProduct = ProductoDTO.fromData(deletedProductData);
      return deletedProduct;
    } catch (error) {
      throw new Error(`Error deleting product with ID: ${productId}`);
    }
  }

  async checkStock(productId, quantity) {
    try {
      const productData = await ProductRepository.getById(productId);
      const product = ProductoDTO.fromData(productData);
      if (product && product.stock >= quantity) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Error checking stock for product with ID: ${productId}`);
    }
  }
}

export default new ProductManager();