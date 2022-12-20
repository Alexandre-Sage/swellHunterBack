import { Types } from "mongoose";
import { ImageRepositoryInterface } from "../../../mongoDb/repository/imageRepository";
import { SpotInterface } from "../../../mongoDb/spots/spotInterface";
import { UserInterface } from "../../../mongoDb/user/userInterface";
import { compressImage } from "../../../sharedModules/upload/imageStorage";

export class ImageUploadService {
  constructor(private readonly imageRepository: ImageRepositoryInterface) {
    this.imageRepository = imageRepository
  }
  createDbImagePath = (string: string | undefined, splitCharactere: string, spliceIndex: number, numberOfDelete: number, joinCharactere: string, replacement?: string): string | Error => {
    const array: Array<string> | undefined = string ? string.split(splitCharactere) : undefined;
    if (replacement && array) array.splice(spliceIndex, numberOfDelete, replacement);
    else if (array && !replacement) array.splice(spliceIndex, numberOfDelete);
    else throw new Error("String modification function error");
    const newString: string = array.join(joinCharactere);
    return newString;
  };
  rawImageToDbMapper = (rawImage: any) => {
    const { path, destination, originalname } = rawImage;
    const dataBasePath = this.createDbImagePath(path, "/", 0, 1, "/")
    const imageData = { path: `${dataBasePath}_compressed`, uploadDate: new Date() };
    return imageData;
  }
  uploadUserPicture = async ({ userId, imageData, path }: { userId: UserInterface["_id"], imageData: any, path: string }) => {
    compressImage(`${path}`);
    this.imageRepository.create({ userId, newData: imageData });
  }
  uploadSpotPicture = async ({ imageData, spotId, userId }: { userId: UserInterface["_id"], imageData: any, spotId: SpotInterface["_id"] }) => {
    const newData = { ...imageData, spotId }
    return this.imageRepository.create({ userId, newData });
  }
}