import server from "../../../server";
import chai, { expect } from "chai";
import chaiHttp from "chai-http"
import { Suite } from "mocha";
import { getAuthentificationToken } from "../../../../sharedModules/testModules/login"
import { fetchOneDocument } from "../../../../sharedModules/mongoDb/getOneDocument";
import { User } from "../../../../mongoDb/user/users";
import { Types } from "mongoose";
import { Spot } from "../../../../mongoDb/spots/spot";
import { expectCt } from "helmet";
import { database } from "../../../../mongoDb/server/database";


chai.use(chaiHttp)

const url = `https://development.alexandre-sage-dev.fr/auth/logIn`


export default describe("LOG IN AND GET ONE SPOT", function () {
  before(async () => {
    try {
      //const userId = (await database.userRepository.getUserByUserName({ userName, requiredFields }))._id
      //const userName = "TestOne";
      const spot = await database.spotRepository.getSpotBySpotName("port blanc");
      this.ctx.spotId = spot?._id;
      this.ctx.spot = spot;
    } catch (err) { throw err };
  })

  it("Should log in and get one spot json info", async () => {
    const agent = chai.request.agent(server);
    const credentials = { email: "test@testOne.com", password: "test" };
    const responseMessage = this.ctx.spot;
    const contentType = 'application/json; charset=utf-8';
    try {
      const token: any = await getAuthentificationToken(url, credentials)
      const response = await agent.get(`/spot/getSpot/${this.ctx.spotId}`).set("Authorization", `Bearer ${token.token}`);
      const { header, body, error } = response;
      expect(error).to.be.eql(false);
      expect(response).to.have.property("status").eql(200);
      expect(header).to.have.property('content-type').eql(contentType);
      //expect(body).to.be.eql(responseMessage)
      expect(header).to.have.property('access-control-allow-credentials').eql("true");
    } catch (error: any) {
      throw error
    };
  });
});















//import server from "../../../../server";
//import { testGetRoute, testPostRoute } from "../../testModules/httpModule.test";
//import { jsonHeader200ObjCookie, jsonHeader200ObjectNoCookie, assertBodyNoRedirectObj, noErrorObject, chaiAgent, } from "../../globalsTestVar";
//import fetchOneEntriesFromDb from "../../../../mongo/modules/fetchOneEntries";
//import User from "../../../../mongo/users/users";
//import { Spot } from "../../../../mongo/spots/spots";

//export default describe("3) SHOULD GET ONE USER SPOTS", function () {
//  before(async () => {
//    const researchObjectUser = { userName: "TestOne" };
//    const researchObjectSpot = { spotName: "Fuck" }
//    const fieldObject = { _id: 1 };
//    try {
//      const userId = await fetchOneEntriesFromDb(User, researchObjectUser, fieldObject);
//      const spot = await fetchOneEntriesFromDb(Spot, researchObjectSpot, fieldObject);
//      const spotId = spot._id
//      //console.log(userId)
//      this.ctx.spotId = spotId
//    } catch (err) { console.log(err) };
//  })
//  it("Should log and get user spots", async () => {
//    const chai = chaiAgent();
//    const agentObj = { agent: chai.request.agent(server) };
//    const sendBody = { email: "test@testOne.com", password: "test" };
//    try {
//      await testGetRoute(agentObj, "/csrf", jsonHeader200ObjCookie, noErrorObject, assertBodyNoRedirectObj);
//      await testPostRoute(agentObj, "/login", sendBody, jsonHeader200ObjCookie, noErrorObject, assertBodyNoRedirectObj);
//      await testGetRoute(agentObj, `/spot/getSpot/${this.ctx.spotId}`, jsonHeader200ObjectNoCookie, noErrorObject, assertBodyNoRedirectObj)
//      agentObj.agent.close();
//    } catch (error: any) {
//      agentObj.agent.close();
//      throw error;
//    };
//  });
//});