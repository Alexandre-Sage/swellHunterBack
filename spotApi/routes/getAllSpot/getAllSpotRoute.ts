import express, { Request, Response, Router } from "express";
import { database } from "../../../mongoDb/server/database";
import { SpotInterface } from "../../../mongoDb/spots/spotInterface";
import { ErrorResponseInterface } from "../../../sharedModules/errors/errorClass";
import { getToken, sessionTokenAuthentification } from "../../../sharedModules/jwt/jwtManagement";
const router: Router = express.Router();


type ResponseType = Response<SpotInterface[] | ErrorResponseInterface>;
type RequestType = Request<never, unknown, never>;
router.get("/", async function (req: RequestType, res: ResponseType) {
  const token = getToken(req);
  const filter = { _id: 1, spotName: 1, location: 1 };
  try {
    const userId = (await sessionTokenAuthentification(token)).userId
    const spotsInfo = await database.spotRepository.getAll({ userId, filter })
    const test = "here"
    res.status(200).json(
      spotsInfo,
    );
  } catch (error: any) {
    console.log(error)
    res.status(error.httpStatus).json({
      message: error.message,
      error: true
    });
  };
});

export default router;

