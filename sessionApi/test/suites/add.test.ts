import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { randomUUID } from "crypto";
import { database } from "../../../mongoDb/server/database";
import { SessionInterface } from "../../../mongoDb/sessions/sessionInterface";
import { getUserId } from "../../../sharedModules/testModules/getUserId";
import { getAuthentificationToken } from "../../../sharedModules/testModules/login";
import { server } from "../../server";
import { createSpot, sessionFactory, spotFactory } from "../fixtures/session.fixture";
const url = `https://development.alexandre-sage-dev.fr/auth/logIn`
chai.use(chaiHttp)
const credentials = { email: "test@testOne.com", password: "test" };
console.log(randomUUID())
const postNewSession = async (newSessionData: Partial<SessionInterface>) => {
  const agent = chai.request.agent(server);
  const token = (await getAuthentificationToken(url, credentials)).token
  return await agent.post("/sessionApi/sessions")
    .send({ newSessionData })
    .set("Authorization", `Bearer ${token}`);
}
const contentType = 'application/json; charset=utf-8';

describe('CREATE NEW SESSION', function () {
  before(async () => {
    await createSpot(spotFactory({}));
    const { _id } = await database.mongoose.models.Spot.findOne({ spotName: "port blanc" }, { _id: 1, spotName: 1 })
    this.ctx.agent = chai.request.agent(server);
    this.ctx.token = (await getAuthentificationToken(url, credentials)).token
    this.ctx.spotId = _id
  });
  it("Should log in and post a new session to data base with sucess", async () => {
    const { token, agent, spotId } = this.ctx
    const responseMessage = "New session created with sucess";
    const contentLength = '59';
    try {
      const session = sessionFactory({ spotId })
      const { header, body, error, status } = await postNewSession(session as any);
      expect(error).to.be.eql(false);
      expect(status).to.be.eql(201);
      expect(body).to.have.property("message").eql(responseMessage);
      expect(header).to.have.property('content-type').eql(contentType);
      expect(header).to.have.property('content-length').eql(contentLength);
      expect(header).to.have.property('access-control-allow-credentials').eql("true");
    } catch (error: any) {
      console.log({ error })
      throw error;
    };
  });
  it("Should throw an error for missing spot id", async () => {
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
  })
});
