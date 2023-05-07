import { create, getAll, findByUserId, update, deleteByUserId } from '../dao/monogDB/carritoDAO.js';

export const createCarrito = async (carrito) => {
  const newCarrito = await create(carrito);
  return newCarrito;
};

export const getAllCarritos = async () => {
  const carritos = await getAll();
  return carritos;
};

export const getCarritoById = async (carritoId) => {
  const carrito = await findByUserId(carritoId);
  return carrito;
};

export const updateCarrito = async (carritoId, updatedCarrito) => {
  const updated = await update(carritoId, updatedCarrito);
  return updated;
};

export const deleteCarritoById = async (carritoId) => {
  const deleted = await deleteByUserId(carritoId);
  return deleted;
};