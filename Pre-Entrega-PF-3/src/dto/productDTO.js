export class ProductoDTO {
    constructor(id, nombre, precio, cantidad, total) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.cantidad = cantidad;
      this.total = total;
    }
  
    static fromModel(producto) {
      return new ProductoDTO(producto.id, producto.nombre, producto.precio, producto.cantidad, producto.total);
    }
}  