import express from 'express';
import CarritoManager from '../manager/CarritoManager.js';

const router = express.Router();

// Obtener todos los productos del carrito
router.get('/', (req, res) => {
  const carrito = new CarritoManager();
  const productos = carrito.getProductos();
  res.json(productos);
});

// Obtener un producto del carrito por id
router.get('/:id', (req, res) => {
  const carrito = new CarritoManager();
  const id = req.params.id;
  const producto = carrito.getProductosPorId(id);
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ error: 'Producto no encontrado en el carrito' });
  }
});

// Agregar un producto al carrito
router.post('/', (req, res) => {
  const carrito = new CarritoManager();
  const { id, title, description, code, thumbnail, price, status, stock } = req.body;
  const product = { id, status, title, description, code, thumbnail, price, stock };
  carrito.add(product);
  res.json({ mensaje: 'Producto agregado al carrito' });
});

// Eliminar un producto del carrito por id
router.delete('/:id', (req, res) => {
  const carrito = new CarritoManager();
  const id = req.params.id;
  carrito.eliminarProducto(id);
  res.json({ mensaje: 'Producto eliminado del carrito' });
});

export default router;
