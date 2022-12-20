import { ObjectId } from "mongodb";
import { Model, model, Models, Schema, Types } from "mongoose";
import { SessionInterface } from "../sessions/sessionInterface";
import { SpotInterface } from "../spots/spotInterface";
import { UserInterface } from "../user/userInterface";

export interface ImageInterface {
  userId?: UserInterface["_id"];
  spotId?: SpotInterface["_id"];
  sessionId?: SessionInterface["_id"]
  uploadDate: Date;
  path: string
}
const ImageSchema = new Schema<ImageInterface>({
  userId: { type: ObjectId, required: true },
  spotId: { type: ObjectId, required: false },
  sessionId: { type: ObjectId, required: false },
  uploadDate: { type: Date, default: Date.now, required: true },
  path: { type: String, required: true }
});

const Images = model<ImageInterface>("Image", ImageSchema);
export { Images, ImageSchema };