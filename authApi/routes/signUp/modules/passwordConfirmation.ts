import { CustomError } from "../../../../sharedModules/errors/errorClass";
import { CustomErrorInterface } from "../../../../sharedModules/errors/errorClass";

export default function passwordConfirmation(password: string, passwordConfirmation: string) {
    const error = new CustomError(
        "Password confirmation doesnt match",
        "PASSWORD CONFIRMATION ERROR",
        400
    )
    return new Promise((resolve: Function, reject: Function) => {
        password === passwordConfirmation ? resolve(true) : reject(error)
    });
};

