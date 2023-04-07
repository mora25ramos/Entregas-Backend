import { Router } from "express";
import ProductManager from "../../dao/fileSystem/ProductManager.js";

const productsRouter = Router();

const productManager = new ProductManager();

productsRouter.get("/", async (req, res) => {
  const productos = await productManager.getAll();
  res.render("products", { productos });
});

productsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const producto = await productManager.getById(id);
  res.json(producto);
});

productsRouter.post("/", async (req, res) => {
  try {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const producto = {
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    };
    const savedProduct = await productManager.save(producto);
    
    const io = req.app.get('socketio');
    io.emit("showProducts", await productManager.getAll());
    
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al crear el producto.");
  }
});

productsRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  const producto = await productManager.updateProduct(
    id,
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock
  );
  res.json(producto);
});

productsRouter.delete("/:pid", async (req, res) => {
  const id = req.params.pid;
  const deletedProduct = await productManager.deleteById(id);
  
  const io = req.app.get('socketio');
  io.emit("showProducts", await productManager.getAll());
  
  res.json(deletedProduct);
});

export default productsRouter;