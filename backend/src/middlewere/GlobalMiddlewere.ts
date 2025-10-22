import { NextFunction, Request, Response } from "express";


export function GlobalMiddlewere(req:Request,res:Response,next : NextFunction){

    try{

        const rawBody = req.body;

        console.info(req.url);
        console.info(rawBody);
        next();
    }catch(error : any){
        console.error(error);
        res.status(400).json({error : error.message});
    }
}