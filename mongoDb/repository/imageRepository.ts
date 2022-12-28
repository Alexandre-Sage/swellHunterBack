import { Model, Schema } from "mongoose";
import { ImageInterface, Images } from "../images/image";
import { SpotInterface } from "../spots/spotInterface";
import { UserInterface } from "../user/userInterface";
import { Repository, RepositoryInterface, RepositoryModel } from "./repositoryClass";

interface RepositoryParams {
  userId: UserInterface["_id"];
  imageData: ImageInterface;
  spotId?: SpotInterface["_id"]
}

export interface ImageRepositoryInterface extends RepositoryInterface<ImageInterface> {
  addSpotImage: ({ }: RepositoryParams) => Promise<void>
  getSpotImagesBySpotId: (spotId: SpotInterface["_id"]) => Promise<ImageInterface[]>
}

export class ImageRepository extends Repository<ImageInterface> implements ImageRepositoryInterface {
  constructor(readonly model: RepositoryModel<ImageInterface>) {
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