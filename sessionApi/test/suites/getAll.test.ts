import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { database } from "../../../mongoDb/server/database";
import { getAuthentificationToken } from "../../../sharedModules/testModules/login";
import { server } from "../../server";
import { createSpot, spotFactory } from "../fixtures/session.fixture";

const url = `https://development.alexandre-sage-dev.fr/auth/logIn`
chai.use(chaiHttp)
const credentials = { email: "test@testOne.com", password: "test" };

const session = randomUUID()

describe('TEST SUITE', function () {
  before(async () => {
    await createSpot(spotFactory({}));
    const { _id } = await database.mongoose.models.Spot.findOne({ spotName: "port blanc" }, { _id: 1, spotName: 1 })
    this.ctx.agent = chai.request.agent(server);
    this.ctx.token = (await getAuthentificationToken(url, credentials)).token
    this.ctx.spotId = _id
  });
  it('Should ...', () => {
    try {
    } catch (error) {
      console.log({ error })
      throw error
    }
  });
});