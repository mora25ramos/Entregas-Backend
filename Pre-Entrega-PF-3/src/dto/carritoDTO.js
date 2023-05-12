export class CarritoDTO {
    constructor(id, productos, total) {
      this.id = id;
      this.productos = productos;
      this.total = total;
    }
  
    static fromModel(carrito) {
      const productosDTO = carrito.productos.map((producto) => ProductoDTO.fromModel(producto));
      return new CarritoDTO(carrito.id, productosDTO, carrito.total);
    }
}  