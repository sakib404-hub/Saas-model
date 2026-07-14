import type { NextFunction, Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import { authServices } from "./auth.service";
import sendResponse from "../../utility/sendResponse";
import status from "http-status";

const registerUser = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{

    const payLoad = req.body;

    const result = await authServices.registerUser(payLoad);

    return sendResponse(res, {
        success : true,
        statusCode : status.CREATED,
        message : "User Registration Successful.",
        data : result
    })

})


const loginUser = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{

    const payLoad = req.body;

    const {accessToken, refreshToken} = await authServices.loginUser(payLoad);

    return sendResponse(res, {
        success : true,
        statusCode : status.OK,
        message : "Login Successful",
        data : {
            accessToken,
            refreshToken
        }
    })

})

export const authController = {
    registerUser,
    loginUser
}