import { Router } from "express";
import CarritoManager from "../../dao/fileSystem/CarritoManager.js"

const carritoRouter = Router();

const carrito = new CarritoManager();

carritoRouter.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await carrito.getById(cid);
    if (!cart) {
      return res.status(404).send('No se encontró el carrito solicitado.');
    }
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al obtener el carrito.');
  }
});

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

carritoRouter.delete('/borrar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const carritoBorrado = await carrito.deleteById(id);
    if (carritoBorrado) {
      res.json(carritoBorrado);
    } else {
      res.status(404).json({
        error: 'Producto no encontrado',
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export default carritoRouter;
