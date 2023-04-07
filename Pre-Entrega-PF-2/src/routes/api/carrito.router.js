import { Router } from 'express'
import Carrito from '../../dao/models/Carrito.js'
import Product from '../../dao/models/Product.js'

const carritoRouter = Router();

// GET all carts
carritoRouter.get('/', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const count = await Carrito.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;
    const prevPage = hasPrevPage ? page - 1 : null;
    const prevLink = hasPrevPage ? `/api/carrito?limit=${limit}&page=${prevPage}` : null;
    const nextLink = hasNextPage ? `/api/carrito?limit=${limit}&page=${nextPage}` : null;

    const carts = await Carrito.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('products.product');

    res.status(200).json({
      status: 'success',
      payload: carts,
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

// GET one cart by id
carritoRouter.get('/:cid', async (req, res) => {
  try {
    const cart = await Carrito.findById(req.params.cid).populate('products.product');
    res.status(200).json({
      status: 'success',
      payload: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Server error. Try again.',
    });
  }
});

// POST create cart
carritoRouter.post('/', async (req, res) => {
  try {
    const cart = new Carrito();
    const newCart = await cart.save();
    res.status(201).json({
      status: 'success',
      payload: newCart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Server error. Try again.',
    });
  }
});

// PUT update cart with array of products
carritoRouter.put('/:cid', async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.cid).populate('products.product');
  
      const products = req.body.products;
      cart.products = [];
      let total = 0;
  
      for (let i = 0; i < products.length; i++) {
        const product = await Product.findById(products[i].product);
        cart.products.push({ product: product._id, quantity: products[i].quantity });
        const cart = await Carrito.findById(req.params.cid).populate('products.product');
        total += product.price * products[i].quantity;
      }
  
      cart.total = total;
      await cart.save();
  
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const count = await Cart.countDocuments({});
      const totalPages = Math.ceil(count / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;
      const nextPage = hasNextPage ? page + 1 : null;
      const prevPage = hasPrevPage ? page - 1 : null;
      const prevLink = hasPrevPage ? `/api/carts?limit=${limit}&page=${prevPage}` : null;
      const nextLink = hasNextPage ? `/api/carts?limit=${limit}&page=${nextPage}` : null;
  
      res.status(200).json({
        status: 'success',
        payload: cart,
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
  
  // PUT update quantity of product in cart
  carritoRouter.put('/:cid/products/:pid', async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.cid).populate('products.product');
      const product = cart.products.find((p) => p.product._id.toString() === req.params.pid);
  
      if (product) {
        const newQuantity = req.body.quantity || 0;
        product.quantity = newQuantity;
        cart.total = 0;
  
        for (let i = 0; i < cart.products.length; i++) {
          const p = cart.products[i];
          cart.total += p.product.price * p.quantity;
        }
  
        await cart.save();
  
        res.status(200).json({
          status: 'success',
          payload: cart,
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: 'Product not found in cart.',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'Server error. Try again.',
      });
    }
});

// DELETE all products from a cart
carritoRouter.delete('/:cid', async (req, res) => {
    try {
      const cart = await Cart.findByIdAndUpdate(
        req.params.cid,
        { $set: { products: [] } },
        { new: true }
      );
      res.status(200).json({
        status: 'success',
        message: 'All products removed from cart.',
        payload: cart,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'Server error. Try again.',
      });
    }
});

export default carritoRouter;