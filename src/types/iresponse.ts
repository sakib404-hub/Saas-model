export interface IResponse<T> {
    success : boolean;
    statusCode : number;
    message : string;
    data ? : T;
    metadata ? : {
        page : number;
        limit : number;
        total : number
    }
}