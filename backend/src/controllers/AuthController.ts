import { AuthService } from "../services/AuthService";
import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserRole } from "../generated/prisma";



export class AuthController{
    private authService : AuthService;

    constructor(){
        this.authService = new AuthService();
    }

    signUp = async (req:Request,res:Response) => {
        try {
            const { name, email, password, role } = req.body;
            
            const newUser = await this.authService.signUp({name,email,password,role});

            res.status(201).json(newUser);
            
        } catch ( error : any) {
            console.error(error);
            res.status(400).json({error : error.message});
        }
    }

    logIn = async (req:Request,res:Response) => {
        try {
            const { name, email, password, role } = req.body;
            
            const user = await this.authService.logIn({name,email,password,role});

            res.status(200).json(user);
            
        } catch ( error : any) {
            console.error(error);
            res.status(400).json({error : error.message});
        }
    }
}