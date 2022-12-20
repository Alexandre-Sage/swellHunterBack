import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { database } from "../../../mongoDb/server/database";
import { createSession } from "../../../sharedModules/testModules/createSession";
import { getUserId } from "../../../sharedModules/testModules/getUserId";
import { getAuthentificationToken } from "../../../sharedModules/testModules/login";
import { server } from "../../server";
import { createSpot, fakeSessionToAdd, spotFactory } from "../fixtures/session.fixture";

const url = `https://development.alexandre-sage-dev.fr/auth/logIn`
chai.use(chaiHttp)
const credentials = { email: "test@testOne.com", password: "test" };

const getAllSession = async () => {
  const agent = chai.request.agent(server);
  const token = (await getAuthentificationToken(url, credentials)).token
  return await agent.get("/sessionApi/sessions")
    .set("Authorization", `Bearer ${token}`);
}
const contentType = 'application/json; charset=utf-8';


export default describe.only('GET ALL SESSION', function () {
  before(async () => {
    await createSpot(spotFactory({}));
    const { userId } = await getUserId(credentials)
    const { _id: spotId } = await database.mongoose.models.Spot.findOne({ spotName: "port blanc" }, { _id: 1, spotName: 1 })
    await Promise.all(fakeSessionToAdd(spotId, userId).map(async fakeSession => createSession(fakeSession)))
    // await createSession()
    this.ctx.agent = chai.request.agent(server);
    this.ctx.token = (await getAuthentificationToken(url, credentials)).token
    this.ctx.spotId = spotId
    this.ctx.userId = userId
  });
  it('Get all user session', async () => {
    const { token, agent, spotId } = this.ctx
    const responseMessage = fakeSessionToAdd(spotId, this.ctx.userId);
    const contentLength = '59';
    try {
      const { header, body, error, status } = await getAllSession();
      expect(error).to.be.eql(false);
      expect(status).to.be.eql(200);
      // expect(body).to.have.property("sessions").eql(responseMessage);
      expect(header).to.have.property('content-type').eql(contentType);
      //expect(header).to.have.property('content-length').eql(contentLength);
      expect(header).to.have.property('access-control-allow-credentials').eql("true");
    } catch (error: any) {
      console.log({ error })
      throw error;
    };
  });
});