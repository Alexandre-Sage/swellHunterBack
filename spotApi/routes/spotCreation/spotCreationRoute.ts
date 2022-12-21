import express, { Request, Response } from "express";
import { database } from "../../../mongoDb/server/database";
import { SpotInterface } from "../../../mongoDb/spots/spotInterface";
import { UserInterface } from "../../../mongoDb/user/userInterface";
import { sessionTokenAuthentification, getToken } from "../../../sharedModules/jwt/jwtManagement";
import { spotValidatior } from "./spotCreationFunction";
import Joi, { string, object, array } from "joi";

const spotValidationSchema: Joi.ObjectSchema<SpotInterface> = Joi.object({
  spotName: string().required(),
  country: string().required(),
  location: object({
    type: string(),
    coordinates: array()
  }),
  optimalConditions: object({
    wind: object({
      strength: string().required(),
      orientation: string().required(),
    }),
    swell: object({
      size: string().required(),
      period: string().required(),
      orientation: string().required(),
    })
  }),
  orientation: array().required()
})

const router = express.Router();
//AJOUTER OBJECT BODY DANS LE FRONT
type RequestType = Request<never, unknown, { newSpotData: SpotInterface }>;
type ResponseType = Response<{ message: string, error: boolean }>;
router.post("/", async function (req: RequestType, res: ResponseType) {
  const token = getToken(req);
  const { newSpotData } = req.body;
  try {
    const userId = (await sessionTokenAuthentification(token)).userId
    await spotValidatior(newSpotData)
    database.spotRepository.create({ userId, newData: newSpotData })
    return res.status(200).json({
      message: "Spot added with sucess",
      error: false
    })
  } catch (error: any) {
    return res.status(error.httpStatus).json({
      message: error.message,
      error: true
    });
  };
});

export default router;
