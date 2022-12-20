import express, { Request, Response } from "express";
import { database } from "../../mongoDb/server/database";
import { sessionTokenAuthentification } from "../../sharedModules/jwt/jwtManagement";
const router = express.Router();

router.get(`/`, async function (req: Request, res: Response): Promise<Response<JSON>> {
  const token = req.headers.authorization!.split(" ")[1];
  const requiredFields = { userName: 1, firstName: 1, name: 1, location: 1, creationDate: 1, _id: 0 };
  try {
    const userId = (await sessionTokenAuthentification(`${token}`)).userId;
    const userInfo = await database.userRepository.getUserProfilData({ userId, requiredFields });
    return res.status(200).json([userInfo]);
  } catch (error: any) {
    return res.status(error.httpStatus).json({
      message: error.message,
      error: true
    });
  };
});

export default router;
