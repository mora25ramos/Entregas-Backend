export class ProductoDTO {
  constructor(id, nombre, precio, stock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  static fromModel(producto) {
    return new ProductoDTO(producto._id, producto.nombre, producto.precio, producto.stock);
  }
}
