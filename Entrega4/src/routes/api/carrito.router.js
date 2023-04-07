import { Router } from 'express';
import path from 'path';
import CarritoManager from '../../manager/CarritoManager.js';

const carritoRouter = Router(); 

// Ruta para crear un nuevo carrito
carritoRouter.post('/', async (req, res) => {
  try {
    const { products } = req.body;
    const newCart = new CarritoManager(products);
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al crear el carrito.');
  }
});

// Ruta para obtener un carrito por su ID
carritoRouter.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CarritoManager.findById(cid);
    if (!cart) {
      return res.status(404).send('No se encontró el carrito solicitado.');
    }
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener el carrito.');
  }
});

// Ruta para agregar un producto a un carrito
carritoRouter.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await CarritoManager.findById(cid);
    if (!cart) {
      return res.status(404).send('No se encontró el carrito solicitado.');
    }

    const productIndex = cart.products.findIndex((product) => product.productId === pid);

    if (productIndex !== -1) {
      // Si el producto ya está en el carrito, incrementar la cantidad
      cart.products[productIndex].quantity += quantity;
    } else {
      // Si el producto no está en el carrito, agregarlo
      cart.products.push({
        productId: pid,
        quantity,
      });
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al agregar el producto al carrito.');
  }
});

export default carritoRouter;