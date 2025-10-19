import { UserModel, IUserInput } from "../models/UserModel";
import bcrypt from "bcrypt";

export class UserService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async createUser(data: IUserInput & { password: string }) {
    const existingUser = await this.userModel.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    return await this.userModel.createUser({
      name: data.name,
      email: data.email,
      password : passwordHash,
      role: data.role,
    });
  }

  async getAllUsers() {
    return await this.userModel.getAll();
  }
}
