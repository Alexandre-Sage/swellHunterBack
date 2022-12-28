import express, { Request, Response } from "express";
import { _Id } from "../../mongoDb/repository/repositoryClass";
import { SpotInterface } from "../../mongoDb/spots/spotInterface";
import { joiDataValidationHighOrder } from "../../sharedModules/dataValidation/joiHighOrder";
import { getToken, sessionTokenAuthentification } from "../../sharedModules/jwt/jwtManagement";
import { SpotService } from "../service/spotService";
import { spotValidationSchema } from "../validation/spotValidation.schema";

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
    router.get("/", async function (req, res) {
      const { filter } = req.body
      const token = getToken(req);
      try {
        const userId = (await sessionTokenAuthentification(token)).userId
        const spots = await service.getAll({ userId, filter })
        res.status(200).json({
          spots,
          error: false
        });
      } catch (error: any) {
        console.log(error)
        res.status(error.httpStatus).json({
          message: error.message,
          error: true
        });
      };
    });
    router.get("/:spotId", async function (req: Request, res: Response) {
      const { spotId } = req.params;
      const { filter } = req.body;
      const token = getToken(req);
      try {
        const { userId } = await sessionTokenAuthentification(token);
        const spot = service.getById({ _id: spotId as unknown as _Id, userId, filter })
        res.status(200).json({
          spot,
          sucess: true
        });
      } catch (error: any) {
        res.status(error.httpStatus).json({
          message: error.message,
          error: true
        });
      };
    });
    router.put(`/:spotId`, function (req: Request, res: Response) {
      const { } = req.body;
      try {

        res.status(200).json({

        });
      } catch (error) {
        res.status(666).json({

        });
      };
    });
    return router
  };
};


