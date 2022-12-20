import { Model, Schema } from "mongoose";
import { ImageInterface } from "../images/image";
import { SpotInterface } from "../spots/spotInterface";
import { Repository, RepositoryInterface } from "./repositoryClass";

interface SpotRepositoryInterface extends RepositoryInterface {
  getSpotBySpotName: (spotName: string) => Promise<SpotInterface | any>
}

export class SpotRepository extends Repository implements SpotRepositoryInterface {
  constructor(readonly model: Model<SpotInterface, {}, {}, {}, Schema<SpotInterface>>) {
    super(model)
    this.model = model;
  }
  getSpotBySpotName = async (spotName: string) => await this.model.findOne({ spotName })
}
