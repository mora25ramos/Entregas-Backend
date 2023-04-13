const productosList = document.getElementById('productos-list');

const fetchProductos = async () => {
  try {
    const response = await fetch('/api/productos');
    const productos = await response.json();
    productos.forEach(producto => {
      const li = document.createElement('li');
      li.textContent = `${producto.title} - ${producto.price}`;
      productosList.appendChild(li);
    });
  } catch (error) {
    console.log(error);
  }
};

fetchProductos();