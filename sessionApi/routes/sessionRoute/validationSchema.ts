import Joi from "joi";
import { SessionInterface } from "../../../mongoDb/sessions/sessionInterface";
export const sessionBodyValidationSchema: Joi.ObjectSchema<SessionInterface> = Joi.object({
  spotId: Joi.string().required(),
  startTime: Joi.date().required(),
  endTime: Joi.date().required(),
  date: Joi.date().required(),
  swell: Joi.object({
    period: Joi.string().required(),
    size: Joi.string().required(),
    orientation: Joi.string().required(),
  }).required(),
  wind: Joi.object({
    orientation: Joi.string().required(),
    strength: Joi.string().required()
  }).required(),
  comment: Joi.string()
})



