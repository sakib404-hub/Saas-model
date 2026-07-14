import type { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken"

export const generateToken = (payLoad: JwtPayload, accessSecret: string, expiresIn: SignOptions) => {

    const token = jwt.sign(payLoad, accessSecret, { expiresIn } as SignOptions)

    return token;
}


export const verifyToken = (accessToken : string, secret : string)=>{
    try{

        const verifiedToken = jwt.verify(accessToken, secret);
        return {
            success : true,
            data : verifiedToken
        }

    }catch(err){

        return {
            success : false,
            erMessage : err instanceof Error ? err.message : "Internal Server Error."
        }

    }
}