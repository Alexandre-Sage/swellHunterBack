import jwt, { JwtHeader, JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import { Types } from "mongoose";
import { CustomError } from "../errors/errorClass"
export interface UserJsonDataInterface {
    userId: Types.ObjectId,
    userName: string,
    sessionToken:string
};


interface TokenDataInterface{
    userId: Types.ObjectId,
    userName:string,
};

export const setSessionToken = (data: TokenDataInterface,  expiresDate: string): string => (
    jwt.sign(data, process.env.JWT_SECRET!, { expiresIn: expiresDate })
);

export const sessionTokenAuthentification = async (jsonWebToken: string):
    Promise<UserJsonDataInterface> => {
    const jwtError = new CustomError(
        "DEV JWT CHECK ERROR",
        "Something went wrong please retry",
        403
    );
    return jwt.verify(jsonWebToken, process.env.JWT_SECRET!, (error, sucess)
        : Promise<string | JwtPayload | CustomError> => (
            error ? Promise.reject(jwtError) : Promise.resolve(sucess!)
    )) as unknown as UserJsonDataInterface
};

export const getToken=(req:Request)=>req.headers.authorization!.split(" ")[1];
