import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../../prisma/generated/prisma/enums";
import catchAsync from "../utility/catchAsync";
import { verifyToken } from "../utility/jwt";
import { config } from "../config/config";
import type { JwtPayload } from "jsonwebtoken";


declare global {
    namespace Express {
        interface Request {
            user ? : {
                id : string;
                name : string;
                email : string;
                role : UserRole
            } 
        }
    }
}



export const auth = (...requiredRoles : UserRole[])=>{
    return catchAsync(async(req: Request, res : Response, next : NextFunction)=>{

        //? first task we have to get the token

        const token = req.cookies.accessToken ? req.cookies.accessToken
            : req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : req.headers.authorization;

        if(!token){
            throw new Error("You are not logged in, kinldy log in first!");
        }


        const verifiedToken = verifyToken(token, config.jwt_access_secret);

        if(!verifiedToken.success){
            throw new Error(verifiedToken.erMessage);
        }

        const {id, name, email, role} = verifiedToken.data as JwtPayload;

        if(requiredRoles.length && !requiredRoles.includes(role)){
            throw new Error("Access denied , you don't have the permission to access this.");
        }

        //? setting up the user in the req

        req.user = {
            id,
            name,
            email,
            role
        }
        next();
    })
}