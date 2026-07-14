import { UserStatus } from "../../../prisma/generated/prisma/enums";
import { config } from "../../config/config";
import { prisma } from "../../lib/prisma";
import type { ILoginPayLoad, IRegisterPayLoad } from "./auth.interface";
import bcrypt from "bcrypt"
import validator from "validator"
import { generateToken } from "../../utility/jwt";
import type { SignOptions } from "jsonwebtoken";

const registerUser = async (payLoad: IRegisterPayLoad) => {

    const hashedPassword = bcrypt.hash(payLoad.password, Number(config.bcrypt_salt_round));

    payLoad.password = await hashedPassword;

    const user = await prisma.user.findUnique({
        where: {
            email: payLoad.email
        }
    })

    //? first cheking if any user exist with this email or not
    if (user) {
        throw new Error("User with this Email Already Exist.");
    }
    if (!validator.isEmail(payLoad.email)) {
        throw new Error("Invalid Email Addres.");
    }

    const result = await prisma.user.create({
        data: {
            ...payLoad
        },
        omit: {
            password: true
        }
    })
    return result;

};

const loginUser = async(payLoad : ILoginPayLoad) => {
    const {email , password} = payLoad;

    const user = await prisma.user.findUnique({
        where : {
            email : email
        }
    });

    if(!user){
        throw new Error("No user found with this email.");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched){
        throw new Error("Invalid Password.");
    }

    if(user.status === UserStatus.BLOCKED){
        throw new Error("Your Account Has been bloacked, contact Support.")
    }
    if(user.status === UserStatus.SUSPENDED){
        throw new Error("Your Account Has been suspended for violating terms and condition.")
    }

    //? creating jwt payload
    const jwtPayLoad = {
        id : user.id,
        name : user.name,
        email : user.email,
        role : user.role
    }

    //? generating the access token and the refresh token
    const accessToken = generateToken(jwtPayLoad, config.jwt_access_secret, config.jwt_access_expires_in as SignOptions)

    const refreshToken = generateToken(jwtPayLoad, config.jwt_refresh_secret, config.jwt_refresh_expires_in as SignOptions);

    return {
        accessToken,
        refreshToken
    }
}

export const authServices = {
    registerUser,
    loginUser
}