// Importar las funciones del controlador
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../../controllers/products.controller.js';
import { ProductoDTO } from '../../dto/productDTO.js';

class ProductManager {
  // Métodos para obtener, agregar, actualizar y eliminar productos utilizando las funciones del controlador
  async getAllProducts() {
    try {
      const productsData = await getAllProducts();
      const products = productsData.map((productData) => ProductoDTO.fromModel(productData));
      return products;
    } catch (error) {
      throw new Error('Error getting all products');
    }
  }

  async getProductById(productId) {
    try {
      const productData = await getProductById(productId);
      const product = ProductoDTO.fromModel(productData);
      return product;
    } catch (error) {
      throw new Error(`Error getting product with ID: ${productId}`);
    }
  }

  async addProduct(productData) {
    try {
      const newProductData = await createProduct(productData);
      const newProduct = ProductoDTO.fromModel(newProductData);
      return newProduct;
    } catch (error) {
      throw new Error('Error adding product');
    }
  }

  async updateProduct(productId, productData) {
    try {
      const updatedProductData = await updateProduct(productId, productData);
      const updatedProduct = ProductoDTO.fromModel(updatedProductData);
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error updating product with ID: ${productId}`);
    }
  }

  async deleteProduct(productId) {
    try {
      const deletedProductData = await deleteProduct(productId);
      const deletedProduct = ProductoDTO.fromModel(deletedProductData);
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
