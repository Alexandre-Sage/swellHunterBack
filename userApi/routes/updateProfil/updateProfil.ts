import express, { Request, Response } from "express";
import { database } from "../../../mongoDb/server/database";
import { notEmptyCheck } from "../../../sharedModules/dataValidation/notEmpty";
import { dataValidation } from "../../../sharedModules/dataValidation/validation";
import { getToken, sessionTokenAuthentification } from "../../../sharedModules/jwt/jwtManagement";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const token = getToken(req);
  try {
    const userId = (await sessionTokenAuthentification(token)).userId;
    await dataValidation(req.body)
    await notEmptyCheck(req.body)
    const updatedUserData = { ...req.body };
    await database.userRepository.updateUserData({ userId, updatedUserData })
    res.status(200).json({
      message: "Profil sucessfully updated",
      error: false
    })
  } catch (error: any) {
    res.status(error.status).json({
      error: true,
      message: error.message
    })
  }
});

export default router;
