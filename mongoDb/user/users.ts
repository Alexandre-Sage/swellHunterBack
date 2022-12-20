import dotenv from "dotenv";
import { Schema, model, connect, disconnect } from "mongoose";
import { UserInterface } from "./userInterface";
import { randomBytes, pbkdf2Sync } from "crypto";
import { CustomError } from "../../sharedModules/errors/errorClass";
dotenv.config()
export const UserSchema = new Schema<UserInterface>({
    location: { type: String, required: true },
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    userName: { type: String, required: true, unique: true, index: true, dropDups: false },
    email: { type: String, required: true, unique: true, index: true, dropDups: false },
    phone: { type: String, required: true, unique: true, index: true, dropDups: false },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    creationDate: { type: Date, default: Date.now, required: true },
    lastConnection: { type: Date, default: Date.now, required: true },
});
UserSchema.methods.hashPassword = async function (password: string) {

    this.salt = randomBytes(25).toString("hex");
    this.password = pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
};
UserSchema.methods.checkPassword = async function (password: string): Promise<void> {
    const hashedPassword = pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
    if (this.password !== hashedPassword) throw new CustomError(
        "Invalid password",
        "USER SCHEMA PASSWORD VALIDATION ERROR",
        400
    )
};
export const User = model<UserInterface>("User", UserSchema);
//connect(`${process.env.MONGO_ATLAS}`, {
//    autoIndex: true,
//}).then(() => User.createIndexes())
//    .catch(err => console.log(err))
//    //.finally(() => disconnect())
//export {UserSchema};

