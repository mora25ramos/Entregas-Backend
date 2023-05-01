import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Producto } from './Product.js';

const __dirname = path.resolve();

class Carrito {
  constructor() {
    this.carrito = {
      id: this.generarId(),
      timestamp: Date.now(),
      productos: [],
    };
    this.filePath = path.join(__dirname, 'carrito.txt');
    this.save();
  }

  generarId() {
    return Math.random().toString(36).substr(2, 9);
  }

  save() {
    try {
      const carrito = JSON.parse(readFileSync(this.filePath, 'utf-8'));
      carrito.push(this.carrito);
      writeFileSync(this.filePath, JSON.stringify(carrito, null, 2), 'utf-8');
    } catch (error) {
      writeFileSync(this.filePath, JSON.stringify([this.carrito], null, 2), 'utf-8');
    }
  }

  read() {
    try {
      const carrito = JSON.parse(readFileSync(this.filePath, 'utf-8'));
      this.carrito = carrito[carrito.length - 1];
    } catch (error) {
      console.log('No se encontró el archivo de carrito. Se creará uno nuevo.');
      this.save();
    }
  }

  addProduct(producto) {
    this.read();
    const productoExistente = this.carrito.productos.find(
      (prod) => prod.id === producto.id
    );
    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      const nuevoProducto = new Producto(
        producto.id,
        producto.timestamp,
        producto.nombre,
        producto.descripcion,
        producto.codigo,
        producto.foto,
        producto.precio,
        1
      );
      this.carrito.productos.push({ ...nuevoProducto });
    }
    this.save();
    return this.carrito;
  }

  deleteProduct(ProductId) {
    this.read();
    this.carrito.productos = this.carrito.productos.filter(
      (producto) => producto.id !== ProductId
    );
    this.save();
    return this.carrito;
  }

  getCarrito() {
    this.read();
    return this.carrito;
  }

  emptyCart() {
    this.carrito.productos = [];
    this.save();
    return this.carrito;
  }

  updateProduct(ProductId, cantidad) {
    this.read();
    const productoExistente = this.carrito.productos.find(
      (producto) => producto.id === ProductId
    );
    if (productoExistente) {
      productoExistente.cantidad = cantidad;
      this.save();
      return this.carrito;
    } else {
      console.log('El producto no existe en el carrito.');
      return null;
    }
  }
}

export default Carrito;
