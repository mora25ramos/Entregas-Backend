// product.controller.js
import ProductDAO from '../dao/mongoDB/productDAO.js';

class ProductManager {
  async getAll(req, res) {
    try {
      const products = await ProductDAO.getAll();
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }

  async getProductById(req, res) {
    try {
      const product = await ProductDAO.getProductById(req.params.id);
      if (!product) return res.status(404).send('Product not found');
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }

  async addProduct(req, res) {
    try {
      const product = await ProductDAO.addProduct(req.body);
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await ProductDAO.updateProduct(req.params.id, req.body);
      if (!product) return res.status(404).send('Product not found');
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = await ProductDAO.deleteProduct(req.params.id);
      if (!product) return res.status(404).send('Product not found');
      res.json({ msg: 'Product removed' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
}

export default ProductManager;