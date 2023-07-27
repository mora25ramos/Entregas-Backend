import { getDB } from '../../db/db.js';
import { getUserByIdService } from '../../services/userService.js';
import { getProductByIdService } from '../../services/productService.js';
import Ticket from '../models/Ticket.js';

export default class CarritoDAO {
  //Crear un carrito
  static async create(carrito) {
    try {
      const db = getDB();
      const result = await db.collection('carritos').insertOne(carrito);
      return result.insertedId;
    } catch (error) {
      console.error('Error occurred while creating a new cart:', error);
    }
  }

  //Guardar el carrito
  static async save(cart, userId) {
    try {
      const db = getDB();
      const query = { userId: userId };
      const update = {
        $set: { products: cart },
        $setOnInsert: { userId: userId }
      };
      const options = { upsert: true, returnOriginal: false };
      const result = await db.collection('cart').findOneAndUpdate(query, update, options);
      return result.value.products || [];
    } catch (error) {
      console.error(`Error occurred while saving cart for user: ${userId}. Error: ${error}`);
    }
  }

  //Obtener todos los carritos
  static async getAll() {
    try {
      const db = getDB();
      const carritos = await db.collection('carritos').find().toArray();
      return carritos;
    } catch (error) {
      console.error('Error occurred while retrieving carts:', error);
    }
  }

  //Obtener un carrito especifico segun su id
  static async getById(userId) {
    try {
      const db = getDB();
      const result = await db.collection('cart').findOne({ userId: userId });
      return result;
    } catch (error) {
      console.error(`Error occurred while finding cart for user: ${userId}. Error: ${error}`);
    }
  }

  //Eliminar u carrito por id
  static async deleteById(userId) {
    try {
      const db = getDB();
      await db.collection('cart').deleteOne({ userId: userId });
    } catch (error) {
      console.error(`Error occurred while deleting cart for user: ${userId}. Error: ${error}`);
    }
  }

  //Fin de la compra y generacion del Ticket
  static async finalizarCompra(userId, carritoId) {
    try {
      const db = getDB();
      const user = await getUserByIdService(userId);
      const carrito = await db.collection('carritos').findOne({ _id: carritoId });

      if (!user || !carrito || !carrito.products || carrito.products.length === 0) {
        throw new Error('El carrito no existe o está vacío');
      }

      const ticketProducts = [];
      const notAvailableProducts = [];

      // Recorrer los productos del carrito
      for (const carritoProduct of carrito.products) {
        const product = await getProductByIdService(carritoProduct.productId);

        if (!product || product.stock < carritoProduct.quantity) {
          notAvailableProducts.push(carritoProduct.productId);
        } else {
          // Restar la cantidad comprada del stock del producto
          product.stock -= carritoProduct.quantity;
          await product.save();

          ticketProducts.push({
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: carritoProduct.quantity,
          });
        }
      }

      // Crear el ticket
      const ticketData = {
        code: generateTicketCode(), // Implementa esta función para generar un código único para el ticket
        purchase_datetime: new Date(),
        amount: carrito.total,
        purchaser: user.email,
        products: ticketProducts,
        notAvailableProducts,
      };

      const newTicket = new Ticket(ticketData);
      await newTicket.save();

      // Actualizar el carrito con los productos no disponibles
      carrito.products = carrito.products.filter((carritoProduct) => !notAvailableProducts.includes(carritoProduct.productId));
      await carrito.save();

      return {
        ticket: newTicket,
        notAvailableProducts,
      };
    } catch (error) {
      console.error('Error al finalizar la compra:', error);
      throw new Error('Error al finalizar la compra');
    }
  }
};