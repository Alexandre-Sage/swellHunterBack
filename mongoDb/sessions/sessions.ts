import { Schema, model } from "mongoose";
import { SessionInterface } from "./sessionInterface";

const SessionSchema = new Schema<SessionInterface>({
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  spotId: { type: String, required: false },
  spotName: { type: String, required: false },
  location: {
    type: { type: String, default: "Point", required: true },
    coordinates: [{ type: String, required: true }]
  },
  startTime: { type: Date, required: false },
  endTime: { type: Date, required: false },
  totalTime: { type: Date, required: false },
  swell: {
    size: { type: String, required: true },
    period: { type: String, required: true },
    orientation: { type: String, required: true }
  },
  wind: {
    strength: { type: String, required: true },
    orientation: { type: String, required: true }
  },
  comment: { type: String, required: false }
});
const UserSession = model<SessionInterface>("Session", SessionSchema);
export { UserSession, SessionSchema };
