import { Schema, model, Types } from "mongoose";
import { SpotInterface } from "./spotInterface";

const SpotSchema = new Schema<SpotInterface>({
  userId: { type: Types.ObjectId, required: true },
  spotName: { type: String, required: true },
  country: { type: String, required: true },
  type: {
    waveType: { type: String, required: true },
    bottomType: { type: String, required: true },
  },
  location: {
    type: { type: String, default: "Point", required: true },
    coordinates: [{ type: String, required: true }]
  },
  orientation: [{ type: String, required: true }],
  optimalConditions: {
    wind: {
      strength: { type: String, required: false },
      orientation: { type: String, required: false }
    },
    swell: {
      size: { type: String, required: false },
      period: { type: String, required: false },
      orientation: [{ type: String, required: false }]
    }
  },
  picture: [
    {
      path: { type: String, required: false },
      place: { type: String, required: false },
      uploadDate: { type: Date, required: false }
    }
  ],
  sessions: [{ type: String, required: false }],
  creationDate: { type: Date, required: true }
});
const Spot = model<SpotInterface>("Spot", SpotSchema);
Spot.createIndexes();
export { Spot, SpotSchema };
