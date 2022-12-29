import { MongoFilterType, MongoDocument } from "../../mongoDb/repository/repositoryClass";
import { SpotRepository } from "../../mongoDb/repository/spotRepository";
import { SpotInterface } from "../../mongoDb/spots/spotInterface";
import { UserInterface } from "../../mongoDb/user/userInterface";

type SpotFilter = MongoFilterType<SpotInterface>
declare interface SpotServiceInterface {
  create: ({ newSpotData, userId }: { userId: UserInterface["_id"], newSpotData: SpotInterface }) => Promise<void>
  getAll: ({ userId, filter }: { userId: UserInterface["_id"], filter?: SpotFilter }) => Promise<MongoDocument<SpotInterface>[]>
  update: ({ _id, userId, newData }: { _id: SpotInterface["_id"], userId: UserInterface["_id"], newData: SpotInterface }) => Promise<void>
}
export class SpotService implements SpotServiceInterface {
  constructor(private readonly spotRepository: SpotRepository) {
    this.spotRepository = spotRepository;
  };
  create = async ({ userId, newSpotData }: { userId: UserInterface["_id"], newSpotData: SpotInterface }) => {
    const newData = { ...newSpotData, creationDate: new Date() }
    return this.spotRepository.create({ newData, userId });
  };
  getAll = async ({ userId, filter }: { userId: UserInterface["_id"], filter?: SpotFilter }) => {
    return this.spotRepository.getAll({ userId, filter });
  };
  getById = async ({ _id, userId, filter }: { _id: SpotInterface["_id"], userId: UserInterface["_id"], filter?: SpotFilter }) => {
    return this.spotRepository.getById({ _id, userId, filter });
  };
  update = async ({ _id, userId, newData }: { _id: SpotInterface["_id"], userId: UserInterface["_id"], newData: SpotInterface }) => {
    return this.spotRepository.update({ _id, dataToUpdate: newData, userId });
  };
};