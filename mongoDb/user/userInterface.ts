import { PictureObject } from "../generalInterface/pictureObjectInterface";
import { Types } from "mongoose";
import { Document } from "mongoose";
export interface UserInterface {
    _id: Types.ObjectId,
    location: string,
    name: string,
    firstName: string,
    userName: string,
    email: string,
    phone: string,
    password: string,
    salt: string,
    creationDate: Date,
    lastConnection: Date,
    hashPassword: (password: string) => Promise<string>,
    checkPassword: (password: string) => Promise<string>,
    save: () => Promise<Document<unknown, any, UserInterface>>
}
