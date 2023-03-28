class ProductManager {
    constructor() {
      this.products = [];
      this.lastID = 0;
    }
  
    addProduct(product) {
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        throw new Error('All fields are mandatory');
      }
      const foundProduct = this.products.find(p => p.code === product.code);
      if (foundProduct) {
        throw new Error('Product with same code already exists');
      }
      const newProduct = {
        ...product,
        id: ++this.lastID,
      };
      this.products.push(newProduct);
      return newProduct;
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const foundProduct = this.products.find(p => p.id === id);
      if (!foundProduct) {
        console.log('Product not found');
      }
      return foundProduct;
    }
  }  