import { Router } from 'express';
import ProductManager from '../../dao/fileSystem/ProductManager.js';
import { isAdmin } from '../../middlewares/authMiddleware.js';

const productsRouter = Router();
const productManager = new ProductManager();

productsRouter.get('/', async (req, res) => {
  await productManager.getAll(req, res);
});

productsRouter.get('/:id', async (req, res) => {
  await productManager.getProductById(req, res);
});

productsRouter.post('/', isAdmin, async (req, res) => {
  await productManager.addProduct(req, res);
});

productsRouter.put('/:id', isAdmin, async (req, res) => {
  await productManager.updateProduct(req, res);
});

productsRouter.delete('/:id', isAdmin, async (req, res) => {
  await productManager.deleteProduct(req, res);
});

export default productsRouter;