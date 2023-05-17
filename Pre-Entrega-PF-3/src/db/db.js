import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

let client;
let db;

export async function connectDB() {
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
    console.log('Conexión a la base de datos establecida');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

export function getDB() {
  if (!db) {
    throw new Error('La conexión a la base de datos no ha sido establecida');
  }
  return db;
}

export async function disconnectDB() {
  try {
    await client.close();
    console.log('Conexión a la base de datos cerrada');
  } catch (error) {
    console.error('Error al cerrar la conexión a la base de datos:', error);
    throw error;
  }
}