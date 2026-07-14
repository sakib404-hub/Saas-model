import type { NextFunction, Request, Response } from "express";
import { Prisma } from "../../prisma/generated/prisma/client";
import status from "http-status";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode;
    let errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    let errorName = err instanceof Error ? err.name : "Internal Server Error";

    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = status.BAD_REQUEST;
        errorMessage = "Duplicate key Error";
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        statusCode = status.BAD_REQUEST;

        //? now cheking the errorCode
        if (err.code === "P2002") {
            errorMessage = "Duplicate key Error";
        } else if (err.code === "P2003") {
            errorMessage = "Foreign key constrain error."
        } else if (err.code === "P2025") {
            errorMessage = "An operation failed because it depends on one or more records that were required but not found."
        }
    } else if (err instanceof Prisma.PrismaClientInitializationError) {
        if (err.errorCode === "P1000") {
            statusCode = status.UNAUTHORIZED;
            errorMessage = "Authentication failed against database server. Please Check Your Credentials"

        } else if (err.errorCode === "P1001") {
            statusCode = status.BAD_REQUEST;
            errorMessage = "Can't reach database server";
        }

    }else if(err instanceof Prisma.PrismaClientUnknownRequestError){
            statusCode = status.INTERNAL_SERVER_ERROR;
            errorMessage = "Error occurred during query execution"
    }

    return res.status(statusCode || status.INTERNAL_SERVER_ERROR).json({
        success : false,
        statusCode : statusCode || status.INTERNAL_SERVER_ERROR,
        errorMessae : errorMessage,
        errorName : errorName,
        details : err.stack
    })
}