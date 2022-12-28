import { Model, Schema } from "mongoose";
import { ImageInterface } from "../images/image";
import { SpotInterface } from "../spots/spotInterface";
import { Repository, RepositoryInterface, RepositoryModel } from "./repositoryClass";

interface SpotRepositoryInterface extends RepositoryInterface<SpotInterface> {
  getSpotBySpotName: (spotName: string) => Promise<SpotInterface | any>
}

export class SpotRepository extends Repository<SpotInterface> implements SpotRepositoryInterface {
  constructor(readonly model: RepositoryModel<SpotInterface>) {
    super(model)
    this.model = model;
  }
  getSpotBySpotName = async (spotName: string) => await this.model.findOne({ spotName })
}