import { Model, Schema } from "mongoose";
import { ImageInterface, Images } from "../images/image";
import { SpotInterface } from "../spots/spotInterface";
import { UserInterface } from "../user/userInterface";
import { Repository, RepositoryInterface } from "./repositoryClass";

interface RepositoryParams {
  userId: UserInterface["_id"];
  imageData: ImageInterface;
  spotId?: SpotInterface["_id"]
}

export interface ImageRepositoryInterface extends RepositoryInterface {
  addSpotImage: ({ }: RepositoryParams) => Promise<void>
  getSpotImagesBySpotId: (spotId: SpotInterface["_id"]) => Promise<ImageInterface[]>
}

export class ImageRepository extends Repository implements ImageRepositoryInterface {
  constructor(readonly model: Model<ImageInterface, {}, {}, {}, Schema<ImageInterface>>) {
    super(model)
    this.model = model;
  }
  addSpotImage = async ({ imageData, spotId, userId }: RepositoryParams) => {
    const imageToSave = new Images<ImageInterface>({ ...imageData, userId, spotId });
    try {
      this.model.create(imageToSave)
    } catch (error) {
      throw error;
    }
  };

  getSpotImagesBySpotId = async (spotId: SpotInterface["_id"]) => {
    return this.model.find({ spotId }, { path: 1, uploadDate: 1, spotId: 1, userId: 1 })
  };
  getSpotImagesByUserId = async () => { };
  deleteUserImage = async () => { };
  deleteSpotImage = async () => { };
}