import { verify } from "crypto";
import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/auth";


export async function GlobalMiddlewere(req:Request,res:Response,next : NextFunction){

    try{

        const url = req.url;

        if(url && alowedRoutesWithoutAutorization.includes(url)){
            return next();
        }

        const authHeader = req.headers.authorization;

        if(!authHeader){
            throw new Error("Unauthorized");
        }

        const token = authHeader.split(" ")[1];

        if(!token){
            throw new Error("Unauthorized");
        }

        const isValidToken = await verifyJwt(token);

        if(!isValidToken){
            throw new Error("Unauthorized");
        }
        
        next();

    }catch(error : any){
        console.error(error);
        res.status(400).json({error : error.message});
    }
}

const alowedRoutesWithoutAutorization = [
    "/auth/login",
    "/auth/signup"
];