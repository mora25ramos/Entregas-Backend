import { create, getAll, findById, update, deleteById } from '../dao/monogDB/carritoDAO.js';

export const createCarrito = async (carritoData) => {
  const newCarrito = await create(carritoData);
  return newCarrito;
};

export const getAllCarritos = async () => {
  const carritos = await getAll();
  return carritos;
};

export const getCarritoById = async (carritoId) => {
  const carrito = await findById(carritoId);
  return carrito;
};

export const updateCarrito = async (carritoId, updatedCarritoData) => {
  const updatedCarrito = await update(carritoId, updatedCarritoData);
  return updatedCarrito;
};

export const deleteCarritoById = async (carritoId) => {
  const deletedCarrito = await deleteById(carritoId);
  return deletedCarrito;
};