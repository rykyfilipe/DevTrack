import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserRole } from "../generated/prisma";


export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // POST /api/users
  createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;
      const newUser = await this.userService.createUser({
        name,
        email,
        password,
        role: role as UserRole,
      });
      res.status(201).json(newUser);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  };

  // GET /api/users
  getAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
