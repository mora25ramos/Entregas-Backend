import { getDB } from '../../db/db.js';

class CarritoDAO {
  static async agregarProducto(idUsuario, producto) {
    const query = { usuario_id: idUsuario };
    const update = {
      $push: { productos: producto },
      $setOnInsert: { usuario_id: idUsuario }
    };
    const options = { upsert: true, returnOriginal: false };
    try {
      const resultado = await getDB().collection('carritos').findOneAndUpdate(query, update, options);
      return resultado.value;
    } catch (error) {
      console.error('Error al agregar producto al carrito: ', error);
    }
  }

  static async listarProductos(idUsuario) {
    const query = { usuario_id: idUsuario };
    try {
      const resultado = await getDB().collection('carritos').findOne(query);
      return resultado.productos || [];
    } catch (error) {
      console.error('Error al obtener los productos del carrito: ', error);
    }
  }

  static async eliminarProducto(idUsuario, idProducto) {
    const query = { usuario_id: idUsuario };
    const update = {
      $pull: { productos: { id: idProducto } }
    };
    try {
      const resultado = await getDB().collection('carritos').findOneAndUpdate(query, update, { returnOriginal: false });
      return resultado.value;
    } catch (error) {
      console.error('Error al eliminar producto del carrito: ', error);
    }
  }

  static async vaciarCarrito(idUsuario) {
    const query = { usuario_id: idUsuario };
    const update = {
      $unset: { productos: 1 }
    };
    try {
      const resultado = await getDB().collection('carritos').findOneAndUpdate(query, update, { returnOriginal: false });
      return resultado.value;
    } catch (error) {
      console.error('Error al vaciar el carrito: ', error);
    }
  }
}

export default {CarritoDAO};