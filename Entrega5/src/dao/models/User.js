export class User {
    constructor(nombre, email, contrasena, rol) {
      this.nombre = nombre;
      this.email = email;
      this.contrasena = contrasena;
      this.rol = rol || 'user';
    }
};  