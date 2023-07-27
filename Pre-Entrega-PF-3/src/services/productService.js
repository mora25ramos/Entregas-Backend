import {
  createProduct as createProductController,
  getAllProducts,
  getProductById,
  updateProduct as updateProductController,
  deleteProduct,
} from '../controllers/products.controller.js';

export const createProductService = async (productData) => {
  const newProduct = await createProductController(productData);
  return newProduct;
};

export const getProductsService = async () => {
  const products = await getAllProducts();
  return products;
};

export const getProductByIdService = async (productId) => {
  const product = await getProductById(productId);
  return product;
};

export const updateProductService = async (productId, productData) => {
  const updatedProduct = await updateProductController(productId, productData);
  return updatedProduct;
};

export const deleteProductService = async (productId) => {
  await deleteProduct(productId);
};