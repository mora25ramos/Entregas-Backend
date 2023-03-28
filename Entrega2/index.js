const ProductManager = require('./manager/ProductManager');

const productManager = new ProductManager('./manager/Products.json');

// Testing
productManager.addProduct({
  title: 'Product 1',
  description: 'This is product 1',
  price: 10,
  thumbnail: 'https://example.com/product1.jpg',
  code: 'P01',
  stock: 20,
});

console.log(productManager.getProducts());

productManager.updateProduct(1, {
  title: 'New title',
});

console.log(productManager.getProducts());

productManager.deleteProduct(1);

console.log(productManager.getProducts());