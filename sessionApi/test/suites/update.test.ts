import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { database } from "../../../mongoDb/server/database";
import { SessionInterface } from "../../../mongoDb/sessions/sessionInterface";
import { createSession } from "../../../sharedModules/testModules/createSession";
import { getUserId } from "../../../sharedModules/testModules/getUserId";
import { getAuthentificationToken } from "../../../sharedModules/testModules/login";
import { server } from "../../server";
import { createSpot, fakeSessionToAdd, sessionFactory, spotFactory } from "../fixtures/session.fixture";
import { tearDown } from "../highOrder.test";
import { getOneSession } from "./getOne.test";
const url = `https://development.alexandre-sage-dev.fr/auth/logIn`
chai.use(chaiHttp)
const credentials = { email: "test@testOne.com", password: "test" };
const updateSession = async (sessionId: SessionInterface["_id"], update: SessionInterface) => {
  const agent = chai.request.agent(server);
  const token = (await getAuthentificationToken(url, credentials)).token
  return await agent.put(`/sessionApi/sessions/${sessionId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      sessionUpdatedData: { ...update }
    });
}
const contentType = 'application/json; charset=utf-8';

describe('UPDATE SESSION', function () {
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
  it("Should log in and update a session to data base with sucess", async () => {
    const { token, agent, spotId, sessionId } = this.ctx
    const responseMessage = "Session updated with sucess";
    const contentLength = '55';
    try {
      const session = { ...sessionFactory({ spotId }), spotName: "port rhu" }
      const { header, body, error, status } = await updateSession(sessionId, session as any);
      expect(error).to.be.eql(false);
      expect(status).to.be.eql(201);
      expect(body).to.have.property("message").eql(responseMessage);
      expect(header).to.have.property('content-type').eql(contentType);
      expect(header).to.have.property('content-length').eql(contentLength);
      expect(header).to.have.property('access-control-allow-credentials').eql("true");
      const { body: updatedSession } = await getOneSession(sessionId)
      //console.log({ debug: updatedSession, session });
      //expect(updatedSession).to.be.eql(session)
    } catch (error: any) {
      console.log({ error })
      throw error;
    };
  });
  /* it("Should throw an error for missing spot id", async () => {
    const agent = chai.request.agent(server);
    const responseMessage = "The field spot is empty";
    const contentType = 'application/json; charset=utf-8';
    const contentLength = '50';
    try {
      const token: any = await getAuthentificationToken(url, credentials);
      const { userId } = await getUserId(credentials)
      const { spotId, ...session } = sessionFactory({ spotId: null as any })
      const { header, body, error, status } = await postNewSession(session as any);
      expect(status).to.be.eql(500);
      expect(body).to.have.property("message").eql(responseMessage);
      expect(body).to.have.property("error").equal(true)
      expect(header).to.have.property('content-type').eql(contentType);
      expect(header).to.have.property('content-length').eql(contentLength);
      expect(header).to.have.property('access-control-allow-credentials').eql("true");
    } catch (error: any) {
      throw error;
    };
  });
  it("Should throw an error for missing start time", async () => {
    const agent = chai.request.agent(server);
    const responseMessage = "The field start is empty";
    const contentType = 'application/json; charset=utf-8';
    const contentLength = '51';
    try {
      const token: any = await getAuthentificationToken(url, credentials);
      const { userId } = await getUserId(credentials)
      const { startTime, ...session } = sessionFactory({ spotId: this.ctx.spotId })
      const { header, body, error, status } = await postNewSession(session as any);
      expect(status).to.be.eql(500);
      expect(body).to.have.property("message").eql(responseMessage);
      expect(body).to.have.property("error").equal(true)
      expect(header).to.have.property('content-type').eql(contentType);
      expect(header).to.have.property('content-length').eql(contentLength);
      expect(header).to.have.property('access-control-allow-credentials').eql("true");
    } catch (error: any) {
      throw error;
    };
  })
  it("Should throw an error for missing end time", async () => {
    const agent = chai.request.agent(server);
    const responseMessage = "The field end is empty";
    const contentType = 'application/json; charset=utf-8';
    const contentLength = '49';
    try {
      const token: any = await getAuthentificationToken(url, credentials);
      const { userId } = await getUserId(credentials)
      const { endTime, ...session } = sessionFactory({ spotId: this.ctx.spotId })
      const { header, body, error, status } = await postNewSession(session as any);
      expect(status).to.be.eql(500);
      expect(body).to.have.property("message").eql(responseMessage);
      expect(body).to.have.property("error").equal(true)
      expect(header).to.have.property('content-type').eql(contentType);
      expect(header).to.have.property('content-length').eql(contentLength);
      expect(header).to.have.property('access-control-allow-credentials').eql("true");
    } catch (error: any) {
      throw error;
    };
  })
  it("Should throw an error for missing date", async () => {
    const agent = chai.request.agent(server);
    const responseMessage = "The field date is empty";
    const contentType = 'application/json; charset=utf-8';
    const contentLength = '50';
    try {
      const token: any = await getAuthentificationToken(url, credentials);
      const { userId } = await getUserId(credentials)
      const { date, ...session } = sessionFactory({ spotId: this.ctx.spotId })
      const { header, body, error, status } = await postNewSession(session as any);
      expect(status).to.be.eql(500);
      expect(body).to.have.property("message").eql(responseMessage);
      expect(body).to.have.property("error").equal(true)
      expect(header).to.have.property('content-type').eql(contentType);
      expect(header).to.have.property('content-length').eql(contentLength);
      expect(header).to.have.property('access-control-allow-credentials').eql("true");
    } catch (error: any) {
      throw error;
    };
  }); */
  tearDown()
});
