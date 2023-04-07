import { Router } from 'express'
import Product from '../../dao/models/Product.js'

const productsRouter = Router();

// GET all products with filters, pagination, and sorting
productsRouter.get('/', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const sort = req.query.sort === 'asc' ? 'price' : req.query.sort === 'desc' ? '-price' : '';

    let query = {};
    if (req.query.query) {
      query.category = req.query.query;
    }
    if (req.query.available) {
      query.available = true;
    }

    const count = await Product.countDocuments(query);
    const totalPages = Math.ceil(count / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;
    const prevPage = hasPrevPage ? page - 1 : null;
    const prevLink = hasPrevPage ? `/api/products?limit=${limit}&page=${prevPage}` +
        `${req.query.query ? `&query=${req.query.query}` : ''}` +
        `${req.query.available ? '&available=true' : ''}` +
        `${sort ? `&sort=${req.query.sort}` : ''}` : null;
    const nextLink = hasNextPage ? `/api/products?limit=${limit}&page=${nextPage}` +
        `${req.query.query ? `&query=${req.query.query}` : ''}` +
        `${req.query.available ? '&available=true' : ''}` +
        `${sort ? `&sort=${req.query.sort}` : ''}` : null;

    const products = await Product.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      status: 'success',
      payload: products,
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

export default productsRouter;