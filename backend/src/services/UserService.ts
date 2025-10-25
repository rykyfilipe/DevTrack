import { UserModel, IUserInput } from "../models/UserModel";
import { hashPassword, verifyPassword } from "../utils/auth";

export class UserService {
  private userModel: UserModel;

 constructor(userModel?: UserModel) {
    this.userModel = userModel || new UserModel();
  }

  async createUser(data: IUserInput & { password: string }) {
    const existingUser = await this.userModel.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const passwordHash = await hashPassword(data.password);

    return await this.userModel.createUser({
      name: data.name,
      email: data.email,
      password : passwordHash,
      role: data.role,
    });
  }

  async getUserByEmail(email : string){
    return await this.userModel.findByEmail(email);
  }

  async getUserById(id : string){
    return await this.userModel.findById(id);
  }

  async getAllUsers() {
    return await this.userModel.getAll();
  }
}
