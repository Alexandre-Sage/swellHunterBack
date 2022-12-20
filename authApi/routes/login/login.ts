import express, { Request, Response } from "express";
import { notEmptyCheck } from "../../../sharedModules/dataValidation/notEmpty";
import { dataValidation } from "../../../sharedModules/dataValidation/validation";
import { createAuthentification } from "./modules/createAuthentification";

const router = express.Router();
const { log, table } = console;

router.post("/", async function (req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body;
  try {
    await notEmptyCheck(req.body);
    await dataValidation(req.body);
    const authentification = await createAuthentification(password, email);
    return res.status(200).json({
      message: `Welcome back ${authentification.userName}!`,
      token: authentification.sessionToken,
      error: false
    });
  } catch (error: any) {
    return res.status(error.httpStatus).json({
      message: error.message,
      error: true
    });
  };
});

export default router;