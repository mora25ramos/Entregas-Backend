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
  await productManager.save(re.body);

  const io = req.app.get('socketio');
  io.emit("showProducts", await productManager.getAll());

  res.send ({
    status: 'success'
  })
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
  const producto = await productManager.deleteById(id);
  res.json(producto);
});

export default productsRouter;