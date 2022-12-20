import express, { Request, Response } from "express";
import passwordConfirmation from "./modules/passwordConfirmation";
import { createUser } from "./modules/createUser";
import { UserInterface } from "../../../mongoDb/user/userInterface";
import { addMongoDocument } from "../../../sharedModules/mongoDb/addMongoDocument";
import { notEmptyCheck } from "../../../sharedModules/dataValidation/notEmpty";
import { dataValidation } from "../../../sharedModules/dataValidation/validation";
import { database } from "../../../mongoDb/server/database";
const router = express.Router();

interface RequestBody extends UserInterface {
  confirmPassword: string
};


type RequestInterface = Request<never, unknown, RequestBody>;

router.post("/", async function (req: RequestInterface, res: Response) {
  try {
    const { confirmPassword, ...newUserData } = req.body;
    await notEmptyCheck(req.body);
    await dataValidation(req.body);
    await passwordConfirmation(newUserData.password, confirmPassword)
    const test = await database.userRepository.createNewUser({ newUserData })
    res.status(200).json({
      message: "User was sucessfully created",
      error: false
    });
  } catch (error: any) {
    res.status(error.httpStatus).json({
      message: error.message,
      error: true
    })
  }
});

export default router;
