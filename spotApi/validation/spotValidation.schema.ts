import Joi from "joi";
import { SpotInterface } from "../../mongoDb/spots/spotInterface";

export const spotValidationSchema: Joi.ObjectSchema<SpotInterface> = Joi.object({
  spotName: Joi.string().required(),
  country: Joi.string().required(),
  type: Joi.object({
    waveType: Joi.string(),
    bottomType: Joi.string(),
  }),
  location: Joi.object({
    type: Joi.string(),
    coordinates: Joi.array()
  }),
  optimalConditions: Joi.object({
    wind: Joi.object({
      strength: Joi.string().required(),
      orientation: Joi.string().required(),
    }),
    swell: Joi.object({
      size: Joi.string().required(),
      period: Joi.string().required(),
      orientation: Joi.string().required(),
    })
  }),
  orientation: Joi.array().required()
})