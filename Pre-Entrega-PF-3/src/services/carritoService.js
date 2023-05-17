import CarritoDAO from '../dao/mongoDB/carrito.mongo.js';

export const createCarrito = async (carritoData) => {
  const newCarrito = await CarritoDAO.create(carritoData);
  return newCarrito;
};

export const getAllCarritos = async () => {
  const carritos = await CarritoDAO.getAll();
  return carritos;
};

export const getCarritoById = async (carritoId) => {
  const carrito = await CarritoDAO.getById(carritoId);
  return carrito;
};

export const updateCarrito = async (carritoId, updatedCarritoData) => {
  const updatedCarrito = await CarritoDAO.update(carritoId, updatedCarritoData);
  return updatedCarrito;
};

export const deleteCarritoById = async (carritoId) => {
  const deletedCarrito = await CarritoDAO.deleteById(carritoId);
  return deletedCarrito;
};
