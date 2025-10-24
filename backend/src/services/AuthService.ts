import { User } from "../generated/prisma";
import { IUserInput } from "../models/UserModel";
import { createJwt, hashPassword, verifyPassword } from "../utils/auth";
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

        const token = await createJwt({user:{id:user.id,name:user.name}});            

        return {user,token};
    }

    async signUp({name,password,email,role}:IUserInput & {password : string}){
        const user : User | null = await this.userService.getUserByEmail(email);

        if(user && user.email === email){
             throw new Error("User with this email already exists.");
        }

        const newUser = await this.userService.createUser({name,email,password,role});

        const token = await createJwt({user:{id:newUser.id,name:newUser.name}});            

        return {newUser,token};

    }



}