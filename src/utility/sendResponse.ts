import type { Response } from "express";
import type { IResponse } from "../types/iresponse";


const sendResponse = <T>(res : Response, data : IResponse<T>)=>{

    const response : IResponse<T> = {
        success : data.success,
        statusCode : data.statusCode,
        message : data.message
    }

    if(data.data !== undefined){
        response.data = data.data
    }

    if(data.metadata !== undefined){
        response.metadata = data.metadata
    }

    return res.status(data.statusCode).json(response);

}

export default sendResponse;