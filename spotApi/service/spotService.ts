import { FilterType, MongoDocument } from "../../mongoDb/repository/repositoryClass";
import { SpotRepository } from "../../mongoDb/repository/spotRepository";
import { SpotInterface } from "../../mongoDb/spots/spotInterface";
import { UserInterface } from "../../mongoDb/user/userInterface";

type SpotFilter = FilterType<SpotInterface>
declare interface SpotServiceInterface {
  create: ({ newSpotData, userId }: { userId: UserInterface["_id"], newSpotData: SpotInterface }) => Promise<void>
  getAll: ({ userId, filter }: { userId: UserInterface["_id"], filter?: SpotFilter }) => Promise<MongoDocument<SpotInterface>[]>
}
export class SpotService implements SpotServiceInterface {
  constructor(private readonly spotRepository: SpotRepository) {
    this.spotRepository = spotRepository;
  };
  create = async ({ userId, newSpotData }: { userId: UserInterface["_id"], newSpotData: SpotInterface }) => {
    const newData = { ...newSpotData, creationDate: new Date() }
    return this.spotRepository.create({ newData, userId })
  };
  getAll = async ({ userId, filter }: { userId: UserInterface["_id"], filter?: SpotFilter }) => {
    return this.spotRepository.getAll({ userId, filter });
  };
  getById = async ({ _id, userId, filter }: { _id: SpotInterface["_id"], userId: UserInterface["_id"], filter?: SpotFilter }) => {
    return this.spotRepository.getById({ _id, userId, filter })
  }
};