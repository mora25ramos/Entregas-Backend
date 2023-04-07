class ProductManager {
    constructor(filename) {
      this.filename = filename;
      this.products = [];
      this.read();
    }
  
    read() {
      try {
        const data = fs.readFileSync(this.filename, "utf8");
        this.products = JSON.parse(data);
      } catch (err) {
        this.products = [];
      }
    }
  
    getAll() {
      return Promise.resolve(this.products);
    }
  
    getById(id) {
      const product = this.products.find((p) => p.id == id);
      return Promise.resolve(product);
    }
  
    create(product) {
      product.id = this.products.length + 1;
      this.products.push(product);
      this.save();
      return Promise.resolve(product);
    }
  
    update(id, product) {
      const index = this.products.findIndex((p) => p.id == id);
      this.products[index] = { ...product, id: parseInt(id) };
      this.save();
      return Promise.resolve(this.products[index]);
    }
  
    delete(id) {
      const index = this.products.findIndex((p) => p.id == id);
      this.products.splice(index, 1);
      this.save();
      return Promise.resolve();
    }
  
    save() {
      fs.writeFileSync(this.filename, JSON.stringify(this.products));
    }
  }
  
export default ProductManager;  