import { WaveTypeObject } from "../generalInterface/WaveTypeInterface";
import { OptimalConditionsObj } from "../generalInterface/optimalConditionInterface";
import { GeoJsonObject } from "../generalInterface/geoJsonInterface"
import { PictureObject } from "../generalInterface/pictureObjectInterface"
import { Document, Types } from "mongoose";
export interface SpotInterface {
  _id: Types.ObjectId,
  userId?: Types.ObjectId,
  spotName: string,
  country: string,
  type: WaveTypeObject,
  location: GeoJsonObject,
  orientation: Array<String>,
  optimalConditions: {
    wind: {
      strength: string,
      orientation: string,
    },
    swell: {
      size: string,
      period: string,
      orientation: string[],
    }
  },
  sessions: Array<string>,
  creationDate: Date,
  picture: PictureObject,
  save: () => Promise<Document<unknown, any, SpotInterface>>
}
