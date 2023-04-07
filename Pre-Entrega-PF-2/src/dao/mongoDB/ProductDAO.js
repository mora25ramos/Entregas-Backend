const { ObjectId } = require('mongodb');
const { getDB } = require('../db/mongoDB');
const Product = require('../models/Product');

class ProductDAO {
  async getProductos({ filter = {}, options = {} } = {}) {
    const db = getDB();
    const productos = await db.collection('productos').find(filter, options).toArray();
    return productos.map((producto) => new Product(producto));
  }

  async getProductoById(id) {
    const db = getDB();
    const producto = await db.collection('productos').findOne({ _id: ObjectId(id) });
    return producto ? new Product(producto) : null;
  }

  async addProducto(producto) {
    const db = getDB();
    const result = await db.collection('productos').insertOne(producto);
    return new Product({ ...producto, _id: result.insertedId });
  }

  async updateProducto(id, update) {
    const db = getDB();
    const result = await db.collection('productos').findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: update },
      { returnOriginal: false }
    );
    return result.value ? new Product(result.value) : null;
  }

  async deleteProducto(id) {
    const db = getDB();
    const result = await db.collection('productos').findOneAndDelete({ _id: ObjectId(id) });
    return result.value ? new Product(result.value) : null;
  }
}

module.exports = new ProductDAO();