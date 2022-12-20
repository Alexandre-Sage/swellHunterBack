import express, { Request, Response } from "express";
import { ImageInterface } from "../../mongoDb/images/image";
import { database } from "../../mongoDb/server/database";
import { getToken, sessionTokenAuthentification } from "../../sharedModules/jwt/jwtManagement";
import { imageStorage } from "../../sharedModules/upload/imageStorage";
import { services } from "../server";
const router = express.Router();
const { log, table, error } = console

const upload = imageStorage.single("image")

router.post("/", imageStorage.single("image"), async function (req: Request, res: Response, next: any): Promise<Response<JSON>> {
   const { uploadService } = services;
   const fileCopy = { ...req.file }
   const { path, destination, originalname } = fileCopy;
   const token = getToken(req)

   try {
      const imageData = uploadService.rawImageToDbMapper(fileCopy)
      const userId = (await sessionTokenAuthentification(`${token}`)).userId;
      await uploadService.uploadUserPicture({ userId, imageData, path: `${path}` })
      return res.status(200).json({
         message: "You're image was successfully uploaded.",
         error: false
      });
   } catch (error: any) {
      console.log(error)
      return res.status(error.httpStatus).json({
         message: error.message,
         error: true
      });
   };
});

router.get(`/`, async function (req: Request, res: Response): Promise<Response<ImageInterface[]>> {
   const token = getToken(req)
   const pictureFieldObject = { picture: 1, _id: 0 };
   try {
      const { userId } = await sessionTokenAuthentification(`${token}`);
      const pictures = await database.imageRepository.getAll({ userId });
      return res.status(200).json(pictures);
   } catch (error: any) {
      return res.status(error.httpStatus).json({
         message: error.message,
         error: true
      });
   };
});
export { router };
