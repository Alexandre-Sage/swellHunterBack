import server from "../../../server";
import chai, { expect } from "chai";
import chaiHttp from "chai-http"
import { Suite } from "mocha";
import { getAuthentificationToken } from "../../../../sharedModules/testModules/login"

chai.use(chaiHttp)

const url = `https://development.alexandre-sage-dev.fr/auth/logIn`

export default describe("LOG IN AND GET ALL SPOT", function () {
  it("Should log in and get all spot json info", async () => {
    const agent = chai.request.agent(server);
    const credentials = { email: "test@testOne.com", password: "test" };
    //const responseMessage = this.ctx.spot;
    const contentType = 'application/json; charset=utf-8';
    //const contentLength = '126';
    try {
      const token: any = await getAuthentificationToken(url, credentials)
      const response = await agent.get(`/spot/getAllSpots`).set("Authorization", `Bearer ${token.token}`);
      const { header, body, error } = response;
      console.log(body)
      expect(error).to.be.eql(false);
      expect(response).to.have.property("status").eql(200);
      //expect(body).to.be.eql(responseMessage);
      expect(header).to.have.property('content-type').eql(contentType);
      //expect(header).to.have.property('content-length').eql(contentLength);
      expect(header).to.have.property('access-control-allow-credentials').eql("true");
    } catch (error: any) {
      throw error
    };
  });
});



//import server from "../../../../server";
//import { testGetRoute, testPostRoute } from "../../testModules/httpModule.test";
//import { jsonHeader200ObjCookie, jsonHeader200ObjectNoCookie, assertBodyNoRedirectObj, noErrorObject, chaiAgent, } from "../../globalsTestVar";
//
//export default describe("2) SHOULD GET ALL USER SPOTS", function () {
//    it("Should log and get user Spot", async () => {
//        const chai = chaiAgent();
//        const agentObj = { agent: chai.request.agent(server) };
//        const sendBody = { email: "test@testOne.com", password: "test" };
//        /*const responseProperty = [
//            { propertyName: "userInfo", propertyValue: fuck },
//            { propertyName: "error", propertyValue: false }
//        ];*/
//        /*const assertBodyObj = {
//            redirectsLength: 0,
//            propertyArray: responseProperty
//        };*/
//        try {
//            await testGetRoute(agentObj, "/csrf", jsonHeader200ObjCookie, noErrorObject, assertBodyNoRedirectObj);
//            await testPostRoute(agentObj, "/login", sendBody, jsonHeader200ObjCookie, noErrorObject, assertBodyNoRedirectObj);
//            await testGetRoute(agentObj, "/spot/getAllSpots", jsonHeader200ObjectNoCookie, noErrorObject, assertBodyNoRedirectObj)
//            agentObj.agent.close();
//        } catch (error: any) {
//            agentObj.agent.close();
//            throw error;
//        };
//    });
//});