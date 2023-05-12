class UserDTO {
    constructor(id, name, email, role) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.role = role;
    }
  
    static fromModel(userModel) {
      const { _id, name, email, role } = userModel;
      return new UserDTO(_id, name, email, role);
    }
}
  
export default UserDTO; 