import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { database } from "../../../mongoDb/server/database";
import { SessionInterface } from "../../../mongoDb/sessions/sessionInterface";
import { createSession } from "../../../sharedModules/testModules/createSession";
import { getUserId } from "../../../sharedModules/testModules/getUserId";
import { getAuthentificationToken } from "../../../sharedModules/testModules/login";
import { server } from "../../server";
import { createSpot, fakeSessionToAdd, spotFactory } from "../fixtures/session.fixture";
import { tearDown } from "../highOrder.test";

const url = `https://development.alexandre-sage-dev.fr/auth/logIn`
chai.use(chaiHttp)
const credentials = { email: "test@testOne.com", password: "test" };

export const getOneSession = async (sessionId: SessionInterface["_id"]) => {
  const agent = chai.request.agent(server);
  const token = (await getAuthentificationToken(url, credentials)).token
  return await agent.get(`/sessionApi/sessions/${sessionId}`)
    .set("Authorization", `Bearer ${token}`);
}
const contentType = 'application/json; charset=utf-8';


export default describe('GET ONE SESSION', function () {
  before(async () => {
    await createSpot(spotFactory({}));
    const { userId } = await getUserId(credentials)
    const { _id: spotId } = await database.mongoose.models.Spot.findOne({ spotName: "port blanc" }, { _id: 1, spotName: 1 })
    await Promise.all(
      fakeSessionToAdd(spotId, userId).map(async fakeSession => createSession(fakeSession))
    );
    const { _id: sessionId, ...session } = await database.mongoose.models.Session.findOne({ userId })
    this.ctx.agent = chai.request.agent(server);
    this.ctx.token = (await getAuthentificationToken(url, credentials)).token
    this.ctx.spotId = spotId
    this.ctx.userId = userId
    this.ctx.sessionId = sessionId
    this.ctx.sessionData = session._doc
  });
  it('Get one user session', async () => {
    const { token, agent, spotId, sessionData, sessionId } = this.ctx
    const responseMessage = fakeSessionToAdd(spotId, this.ctx.userId);
    const contentLength = '59';
    try {
      const { header, body, error, status } = await getOneSession(sessionId);
      const { _id, ...sessionBody } = body
      expect(error).to.be.eql(false);
      expect(status).to.be.eql(200);
      expect(sessionBody).to.have.property("session").eql(JSON.parse(JSON.stringify({ ...sessionData })));
      expect(header).to.have.property('content-type').eql(contentType);
      expect(header).to.have.property('access-control-allow-credentials').eql("true");
    } catch (error: any) {
      console.log({ error })
      throw error;
    };
  });
  tearDown();
});