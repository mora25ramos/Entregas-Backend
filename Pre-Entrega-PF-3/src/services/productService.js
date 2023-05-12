import ProductDAO from '../dao/mongoDB/productDAO.js';

export const createProduct = async (productData) => {
  const newProduct = await ProductDAO.create(productData);
  return newProduct;
};

export const getProducts = async () => {
  const products = await ProductDAO.getAll();
  return products;
};

export const getProductById = async (productId) => {
  const product = await ProductDAO.getProductById(productId);
  return product;
};

export const updateProduct = async (productId, productData) => {
  const updatedProduct = await ProductDAO.updateProduct(productId, productData);
  return updatedProduct;
};

export const deleteProduct = async (productId) => {
  await ProductDAO.deleteProduct(productId);
};