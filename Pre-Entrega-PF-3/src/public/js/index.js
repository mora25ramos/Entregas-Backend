// Función para obtener la lista de productos mediante una solicitud GET a la API
async function getProducts() {
    try {
      const response = await fetch('/api/products');
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Función para renderizar la lista de productos en el DOM
  function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
  
    products.forEach((product) => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');
  
      const productName = document.createElement('h3');
      productName.innerText = product.name;
  
      const productPrice = document.createElement('p');
      productPrice.innerText = `$${product.price}`;
  
      const productDescription = document.createElement('p');
      productDescription.innerText = product.description;
  
      productItem.appendChild(productName);
      productItem.appendChild(productPrice);
      productItem.appendChild(productDescription);
  
      productList.appendChild(productItem);
    });
  }
  
  // Función principal para cargar la página
  async function loadPage() {
    try {
      const products = await getProducts();
      renderProducts(products);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Ejecutar la función principal al cargar la página
  window.addEventListener('DOMContentLoaded', loadPage);  