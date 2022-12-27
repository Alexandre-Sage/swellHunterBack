import { SpotRepository } from "../../mongoDb/repository/spotRepository";
import { SpotInterface } from "../../mongoDb/spots/spotInterface";
import { UserInterface } from "../../mongoDb/user/userInterface";

declare interface SpotServiceInterface {
  create: ({ newSpotData, userId }: { userId: UserInterface["_id"], newSpotData: SpotInterface }) => Promise<void>
}
export class SpotService implements SpotServiceInterface {
  constructor(private readonly spotRepository: SpotRepository) {
    this.spotRepository = spotRepository;
  };
  create = async ({ userId, newSpotData }: { userId: UserInterface["_id"], newSpotData: SpotInterface }) => {
    const newData = { ...newSpotData, creationDate: new Date() }
    return this.spotRepository.create({ newData, userId })
  };
};