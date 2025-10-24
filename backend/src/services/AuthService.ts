import { User } from "../generated/prisma";
import { IUserInput } from "../models/UserModel";
import { hashPassword, verifyPassword } from "../utils/auth";
import { UserService } from "./UserService";


export class AuthService{

     private userService: UserService;

    constructor(userService?: UserService) {
        this.userService = userService || new UserService();
    }
    async logIn({name,password,email}:IUserInput & {password : string}){
        const user : User | null = await this.userService.getUserByEmail(email);

        if(!user){
             throw new Error("User not found");
        }

        const isPasswordValid = await verifyPassword(user.password,password);

        if(email !== user.email || !isPasswordValid){
             throw new Error("Email or password is wrong");
        }

        console.info("passs")

        return user;
    }

    async signUp({name,password,email,role}:IUserInput & {password : string}){
        const user : User | null = await this.userService.getUserByEmail(email);

        if(user && user.email === email){
             throw new Error("User with this email already exists.");
        }

        return await this.userService.createUser({name,email,password,role});

    }



}