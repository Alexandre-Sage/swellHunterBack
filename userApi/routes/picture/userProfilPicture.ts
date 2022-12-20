import express, { Request, Response } from "express";
import { fetchOneDocument } from "../../../sharedModules/mongoDb/getOneDocument";
import { User } from "../../../mongoDb/user/users";
import { UserInterface } from "../../../mongoDb/user/userInterface";
import { sessionTokenAuthentification, getToken } from "../../../sharedModules/jwt/jwtManagement";
const router = express.Router();


router.get(`/`, async function (req: Request, res: Response): Promise<Response<JSON>> {
  const token = getToken(req)
  const pictureFieldObject = { picture: 1, _id: 0 };
  try {
    const checkTokenIntegrity = await sessionTokenAuthentification(`${token}`);
    const researchObject = { _id: checkTokenIntegrity.userId };
    const pictures: UserInterface = await fetchOneDocument(User, researchObject, pictureFieldObject);
    return res.status(200).json(pictures.picture);
  } catch (error: any) {
    return res.status(error.httpStatus).json({
      message: error.message,
      error: true
    });
  };
});
export default router;