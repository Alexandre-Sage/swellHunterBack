import express, { Request, Response } from 'express';
import Joi from 'joi';
import { Types } from 'mongoose';
import { SessionInterface } from '../../../mongoDb/sessions/sessionInterface';
import { SpotInterface } from '../../../mongoDb/spots/spotInterface';
import { CustomError } from '../../../sharedModules/errors/errorClass';
import { getToken, sessionTokenAuthentification } from '../../../sharedModules/jwt/jwtManagement';
import { service } from '../../server';
import { sessionBodyValidationSchema } from './validationSchema';
import { Query, ParamsDictionary, Params } from 'express-serve-static-core';
import { joiDataValidationHighOrder } from "../../../sharedModules/dataValidation/joiHighOrder"
import { URLSearchParams } from 'url';
import { Type } from 'typescript';
const router = express.Router()

export interface TypedRequest<T extends Query, U> extends Request {
  body: U,
  query: T
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
    const session = await service.getById({ userId, sessionId: sessionId as unknown as Types.ObjectId })
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
type PutRequest = Request<{ id: string }, unknown, { sessionUpdatedData: SessionInterface }>;
router.put(`/:id`, async function (req: PutRequest, res: Response) {
  const { sessionUpdatedData } = req.body;
  const { id } = req.params;
  const token = getToken(req)
  try {
    const { userId } = (await sessionTokenAuthentification(token));
    await service.update({ sessionId: id as unknown as Types.ObjectId, updatedData: sessionUpdatedData, userId })
    res.status(201).json({
      error: false,
      message: "Session updated with sucess"
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Something wrong happened please retry."
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
