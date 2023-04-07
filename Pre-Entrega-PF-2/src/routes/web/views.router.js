import { Router } from 'express'
import Product from '../../dao/models/Product.js'

const viewsRouter = Router();

// Vista de todos los productos
viewsRouter.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const count = await Product.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;
    const prevPage = hasPrevPage ? page - 1 : null;
    const prevLink = hasPrevPage ? `/views/products?limit=${limit}&page=${prevPage}` : null;
    const nextLink = hasNextPage ? `/views/products?limit=${limit}&page=${nextPage}` : null;

    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.render('products', {
      title: 'All Products',
      products,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Server error. Try again.',
    });
  }
});

// Vista a los detalles del producto
viewsRouter.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('product-detail', { title: product.name, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Server error. Try again.',
    });
  }
});

export default viewsRouter;