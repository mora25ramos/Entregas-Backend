class CarritoManager {
    constructor(filename) {
      this.filename = filename;
      this.carrito = { products: [] };
      this.read();
    }
  
    read() {
      try {
        const data = fs.readFileSync(this.filename, "utf8");
        this.carrito = JSON.parse(data);
      } catch (err) {
        this.carrito = { products: [] };
      }
    }
  
    getProducts() {
      return Promise.resolve(this.carrito.products);
    }
  
    getProductById(id) {
      const product = this.carrito.products.find((p) => p.id == id);
      return Promise.resolve(product);
    }
  
    addProduct(product) {
      const existingProduct = this.carrito.products.find(
        (p) => p.id == product.id
      );
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        this.carrito.products.push(product);
      }
      this.save();
      return Promise.resolve(product);
    }
  
    deleteProduct(id) {
      const index = this.carrito.products.findIndex((p) => p.id == id);
      this.carrito.products.splice(index, 1);
      this.save();
      return Promise.resolve();
    }
  
    clear() {
      this.carrito.products = [];
      this.save();
      return Promise.resolve();
    }
  
    save() {
      fs.writeFileSync(this.filename, JSON.stringify(this.carrito));
    }
  }
  
export default CarritoManager;  