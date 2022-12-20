import express, { Request, Router } from "express";
import { getToken, sessionTokenAuthentification } from "../../../sharedModules/jwt/jwtManagement";

import { Types } from "mongoose";
import { database } from "../../../mongoDb/server/database";
//import sessionChecking from "../../modules/sessionManagement/sessionChecking";

const router: Router = express.Router();
type RequestType = Request<{ spotId: string }, unknown, {}>;
router.get("/:spotId", async function (req: RequestType, res) {
  const { spotId } = req.params;
  const token = getToken(req);
  try {
    const { userId } = await sessionTokenAuthentification(token);
    const spotInfo = database.spotRepository.getById({ _id: spotId as unknown as Types.ObjectId, userId })
    res.status(200).json({
      spotInfo,
      sucess: true
    });
  } catch (error: any) {
    res.status(error.httpStatus).json({
      message: error.message,
      error: true
    });
  };
});

export default router;