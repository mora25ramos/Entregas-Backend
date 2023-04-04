const socket = io();

socket.on('connect', () => {
  console.log('Conectado al servidor de websockets!');
});

socket.on('disconnect', () => {
  console.log('Desconectado del servidor de websockets!');
});

const container = document.getElementById('container')

socket.on('showProducts', (data) => {
  container.innerHTML = ``

  data.forEach(product =>{
    container.innerHTML += `
      <ul>
        <li>title:${product.title}</li>
        <li>description:${product.description}</li>
        <li>code:${product.code}</li>
        <li>price:${product.price}</li>
        <li>status:${product.status}</li>
        <li>stock:${product.stock}</li>
        <li>category:${product.category}</li>}
        <li>id:${product.id}</li>
      </ul>
    `
  })
})