import express, { Request, Response } from 'express';
import Joi from 'joi';
import { Types } from 'mongoose';
import { CustomError } from '../../../sharedModules/errors/errorClass';
import { getToken, sessionTokenAuthentification } from '../../../sharedModules/jwt/jwtManagement';
import { service } from '../../server';
import { sessionBodyValidationSchema } from './validationSchema';
const router = express.Router()



const joiDataValidationHighOrder = async (dataToSanitize: any, joiValidationSchema: Joi.ObjectSchema<any>) => {
  try {
    await joiValidationSchema.validateAsync({ ...dataToSanitize })
  } catch (error: any) {
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

router.post(`/`, async function (req: Request, res: Response) {
  const { newSessionData } = req.body;
  const token = getToken(req)
  const { userId } = (await sessionTokenAuthentification(token));
  try {
    await joiDataValidationHighOrder(newSessionData, sessionBodyValidationSchema)
    await service.create({ userId, newData: newSessionData })
    res.status(201).json({
      error: false,
      message: "New session created with sucess"
    });
  } catch (error: any) {
    res.status(error.httpStatus).json({
      error: true,
      message: error.message
    });
  };
});

router.get(`/`, async function (req: Request, res: Response) {
  const token = getToken(req)
  const { userId } = (await sessionTokenAuthentification(token));
  try {
    const sessions = await service.getAll(userId)
    res.status(200).json({
      error: false,
      sessions
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Something wrong happened please retry."
    });
  };
});

router.get(`/:id`, async function (req: Request, res: Response) {
  const { id: sessionId } = req.params
  const token = getToken(req)
  const { userId } = (await sessionTokenAuthentification(token));
  try {
    const session = await service.getById(userId, sessionId as unknown as Types.ObjectId)
    res.status(200).json({
      error: false,
      session
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Something wrong happened please retry."
    });
  };
});

router.put(`/:id`, function (req: Request, res: Response) {
  const { } = req.body;
  try {

    res.status(200).json({

    });
  } catch (error) {
    res.status(666).json({

    });
  };
});

router.delete(`/url/:id`, function (req: Request, res: Response) {
  try {

    res.status(200).json({

    });
  } catch (error) {
    res.status(666).json({

    });
  };
});

export { router };
