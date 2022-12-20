import { HydratedDocument } from "mongoose";
import { UserInterface } from "../../../../mongoDb/user/userInterface";
import { User } from "../../../../mongoDb/user/users";
import { CustomError } from "../../../../sharedModules/errors/errorClass";

export async function createUser(newUserBody: UserInterface): Promise<UserInterface | Error> {
  const newUser = new User<UserInterface>(newUserBody);
  try {
    await newUser.hashPassword(newUserBody.password)
    return newUser
  } catch (error) {
    return new CustomError(
      "Something wrong happen please try again.",
      "USER HASH PASSWORD ERROR",
      400
    )
  }
};
