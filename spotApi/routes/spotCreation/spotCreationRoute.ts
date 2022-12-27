import express, { Request, Response } from "express";
import { database } from "../../../mongoDb/server/database";
import { SpotInterface } from "../../../mongoDb/spots/spotInterface";
import { getToken, sessionTokenAuthentification } from "../../../sharedModules/jwt/jwtManagement";
import { spotValidationSchema } from "../../validation/spotValidation.schema";
import { joiDataValidationHighOrder } from "../../../sharedModules/dataValidation/joiHighOrder"
import { SpotService } from "../../service/spotService";

type RequestType = Request<never, unknown, { newSpotData: SpotInterface }>;

type ResponseType = Response<{ message: string, error: boolean }>;

export class Router {
  private readonly router: express.Router
  constructor(private readonly service: SpotService, private readonly prefix: string,) {
    this.router = express.Router();
    this.service = service;
    this.prefix = prefix;
  }
  initRoutes = () => {
    const { router, service } = this;
    router.post("/", async function (req: RequestType, res: ResponseType) {
      const token = getToken(req);
      const { newSpotData } = req.body;
      try {
        const userId = (await sessionTokenAuthentification(token)).userId
        await joiDataValidationHighOrder(newSpotData, spotValidationSchema)
        service.create({ userId, newSpotData })
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
    return router
  };
};


const router = express.Router();
//AJOUTER OBJECT BODY DANS LE FRONT
//type RequestType = Request<never, unknown, { newSpotData: SpotInterface }>;
//type ResponseType = Response<{ message: string, error: boolean }>;
router.post("/", async function (req: RequestType, res: ResponseType) {
  const token = getToken(req);
  const { newSpotData } = req.body;
  try {
    const userId = (await sessionTokenAuthentification(token)).userId
    await joiDataValidationHighOrder(newSpotData, spotValidationSchema)
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
