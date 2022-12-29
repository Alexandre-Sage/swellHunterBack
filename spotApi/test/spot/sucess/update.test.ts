import server from "../../../server";
import chai, { assert, should, expect } from "chai";
import chaiHttp from "chai-http"
import { Suite, SuiteFunction } from "mocha";
import { User } from "../../../../mongoDb/user/users";
import { getAuthentificationToken } from "../../../../sharedModules/testModules/login";
import { Types } from "mongoose";
import { database } from "../../../../mongoDb/server/database";
import { spotFactory } from "../../fixtures/spot.fixtures";
import { randomUUID } from "crypto";
import { getUserId } from "../../../../sharedModules/testModules/getUserId";

const credentials = { email: "test@testOne.com", password: "test" };
const url = `https://development.alexandre-sage-dev.fr/auth/logIn`

chai.use(chaiHttp)
export default describe("LOG IN AND ADD SPOT SUCESFULL", function () {
  before(async () => {
    //const spotId = randomUUID() as any;
    const { userId } = await getUserId(credentials)
    await database.mongoose.models.Spot.create(spotFactory({ spotName: "test", userId, creationDate: new Date() }))
    const { _id } = await database.mongoose.models.Spot.findOne({ spotName: "test" })
    const newSpot = spotFactory({});
    this.ctx.spotId = _id;
    this.ctx.spot = newSpot;
  });


  it("Should log in and post a new spot to data base with sucess", async () => {
    const agent = chai.request.agent(server);
    const responseMessage = "Spot updated with sucess";
    const contentType = 'application/json; charset=utf-8';
    const credentials = { email: "test@testOne.com", password: "test" };
    const contentLength = '52';
    try {
      const token: any = await getAuthentificationToken(url, credentials);
      const response = await agent.put(`/spots/${this.ctx.spotId}`)
        .send({ newSpotData: { ...this.ctx.spot, spotName: "Quibs" } })
        .set("Authorization", `Bearer ${token.token}`);
      const { header, body, error } = response;
      console.log({ debug: body });
      expect(error).to.be.eql(false);
      expect(response).to.have.property("status").eql(200);
      expect(body).to.have.property("message").eql(responseMessage);
      expect(header).to.have.property('content-type').eql(contentType);
      expect(header).to.have.property('content-length').eql(contentLength);
      expect(header).to.have.property('access-control-allow-credentials').eql("true");
    } catch (error: any) {
      console.log(error)
      throw error;
    };
  });
});