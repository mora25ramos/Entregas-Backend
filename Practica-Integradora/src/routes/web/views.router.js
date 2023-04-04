import { Router } from "express";
import ProductManager from "../../dao/fileSystem/ProductManager.js";
import CarritoManager from "../../dao/fileSystem/CarritoManager.js";

const viewsRouter = Router();
const productManager = new ProductManager()
const carritoManager = new CarritoManager()

viewsRouter.get("/", async (req, res) => {
  try {
    res.render('realTimeProducts', { products: productManager.getAll });
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error al cargar los productos");
  }
});

viewsRouter.get("/producto/vista", (req, res) => {
  res.render("addProduct");
});

viewsRouter.get("/carrito/vista", async (req, res) => {
  try {
    const carrito = await carritoManager.getAll();
    res.render("carrito", { carrito });
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error al cargar el carrito");
  }
});

export default viewsRouter;