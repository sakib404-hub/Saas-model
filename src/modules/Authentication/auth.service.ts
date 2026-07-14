import { config } from "../../config/config";
import { prisma } from "../../lib/prisma";
import type { IRegisterPayLoad } from "./auth.interface";
import bcrypt from "bcrypt"
import validator from "validator"

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

const loginUser = () => {

}

export const authServices = {
    registerUser,
    loginUser
}