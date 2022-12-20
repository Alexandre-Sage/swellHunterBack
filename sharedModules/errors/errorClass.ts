export interface ErrorResponseInterface {
    message: string,
    error: boolean
}

export declare interface CustomErrorInterface extends Error {
    httpStatus: number,
    message: string,
    devMessage: string
};

export class CustomError extends Error {
    constructor(message: string, public devMessage: string, public httpStatus: number) {
        super(message);
        this.httpStatus = httpStatus;
        this.message = process.env.NODE_ENV === "developpment" ? devMessage : message;
        Error.captureStackTrace(this, this.constructor)
    }
}
