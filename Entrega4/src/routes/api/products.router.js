import { Router } from 'express';
import ProductManager from '../../manager/ProductManager.js';

const productsRouter = Router();
const productManager = new ProductManager();

// Ruta para obtener todos los productos
productsRouter.get('/', async (req, res) => {
  try {
    const products = await productManager.getAllProducts();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener los productos.');
  }
});

// Ruta para obtener un producto por su ID
productsRouter.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener el producto.');
  }
});

// Ruta para agregar un producto
productsRouter.post('/', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = await productManager.addProduct({ name, description, price });
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al agregar el producto.');
  }
});

// Ruta para actualizar un producto
productsRouter.put('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const { name, description, price } = req.body;
    const product = await productManager.updateProduct(pid, { name, description, price });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al actualizar el producto.');
  }
});

// Ruta para eliminar un producto
productsRouter.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    await productManager.deleteProduct(pid);
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al eliminar el producto.');
  }
});

export default productsRouter;