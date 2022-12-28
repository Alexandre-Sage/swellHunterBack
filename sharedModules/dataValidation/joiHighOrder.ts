import { CustomError } from "../errors/errorClass";
import Joi from "joi";


export const joiDataValidationHighOrder = async (dataToSanitize: any, joiValidationSchema: Joi.ObjectSchema<any>) => {
  try {
    await joiValidationSchema.validateAsync({ ...dataToSanitize })
  } catch (error: any) {
    console.log({ debug: error });

    let message: string = "";
    switch (error.details[0].type.split(".")[1]) {
      case "required":
        const field = error.details[0].message.split(`"`)[1].split(/(?=[A-Z])/)[0]
        message = `The field ${field} is empty`;
        break;
    }
    throw new CustomError(message, "JoiValidationError", 500)
  }
}