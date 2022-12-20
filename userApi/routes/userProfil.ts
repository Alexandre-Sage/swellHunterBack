import express from "express";
import pictureUpload from "../../imageApi/routes/userPictureUpload";
import userPicture from "./picture/userProfilPicture";
import profilHeader from "./profilHeader"

const router = express.Router();

router.use(profilHeader);
router.use(userPicture);
router.use(pictureUpload);
export default router;