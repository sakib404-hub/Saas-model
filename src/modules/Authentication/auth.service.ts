import { prisma } from "../../lib/prisma";
import type { IRegisterPayLoad } from "./auth.interface";

const registerUser = async(payLoad : IRegisterPayLoad)=>{
    const result = await prisma.user.create({
        data : {
            ...payLoad
        },
        omit : {
            password : true
        }
    })
    return result;
};

const loginUser = () =>{

}

export const authServices = {
    registerUser,
    loginUser
}