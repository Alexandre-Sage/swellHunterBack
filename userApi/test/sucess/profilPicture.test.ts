//import server from "../../server";
//import chai, { request, assert, should, expect, } from "chai";
//import chaiHttp from "chai-http"
//import { Suite } from "mocha";
//import { Response } from "express"
//import { ServerResponse } from "http";
//import { getAuthentificationToken } from "../../../sharedModules/testModules/login"
//
////import registry from "../../../../urlRegistry.mjs"
////const { devloppmentServer } = registry;
//import { objectPropertyAssertion } from "../../../sharedModules/testModules/assertionModule";
//
//chai.use(chaiHttp)
//const url = `https://development.alexandre-sage-dev.fr/auth/logIn`
//
//const data = [{
//  location: 'TestOne',
//  name: 'TestOne',
//  firstName: 'TestOne',
//  userName: 'TestOne',
//  creationDate: "2022-10-15T18:46:17.000Z"
//}]
//
//export default function getUserPictureSucessTest(): Suite {
//  return describe("LOG IN AND GET USER PICTURES", function () {
//    it("Should log in and get user header json info", async () => {
//      const agent = chai.request.agent(server);
//      const credentials = { email: "test@testOne.com", password: "test" };
//      const responseMessage = data;
//      const contentType = 'application/json; charset=utf-8';
//      const propertyArray = ["path", "place", "_id"]
//      try {
//        const token: any = await getAuthentificationToken(url, credentials)
//        const response = await agent.get("/allPicture").set("Authorization", `Bearer ${token.token}`);
//        const { header, body, error } = response;
//        expect(error).to.be.eql(false);
//        expect(response).to.have.property("status").eql(200);
//        expect(body).to.be.a("array");
//        objectPropertyAssertion(body[0], propertyArray);
//        expect(header).to.have.property('content-type').eql(contentType);
//        expect(header).to.have.property('access-control-allow-credentials').eql("true");
//      } catch (error: any) {
//        throw error
//      };
//    });
//  });
//};
//
//
//
//
//
//
//
//
//
////import { testGetRoute, testPostRoute } from "../../testModules/httpModule.test";
////import { jsonHeader200ObjCookie, jsonHeader200ObjectNoCookie, assertBodyNoRedirectObj, noErrorObject, chaiAgent, } from "../../globalsTestVar";
////
////const fuck = {
////    //location: 'TestOne',
////    //name: 'TestOne',
//    //firstName: 'TestOne',
//    //userName: 'TestOne',
//    //email: 'test@testOne.com',
//    //phone: '0606654654',
//    //creationDate: "2022-08-09T19:32:54.000Z",
//    //lastConnection: "2022-08-09T19:32:54.000Z",
//    picture: [],
//}
//export default describe("2) SHOULD GET USER PROFIL PICTURE", function () {
//    it("Should log and get user profil picture", async () => {
//        const chai = chaiAgent();
//        const agentObj = { agent: chai.request.agent(server) };
//        const sendBody = { email: "test@testOne.com", password: "test" };
//        const responseProperty = [
//            { propertyName: "pictures", propertyValue: "nycatlope" },
//            { propertyName: "error", propertyValue: false }
//        ];
//        const assertBodyObj = {
//            redirectsLength: 0,
//            propertyArray: responseProperty
//        };
//        try {
//            await testGetRoute(agentObj, "/csrf", jsonHeader200ObjCookie, noErrorObject, assertBodyNoRedirectObj);
//            await testPostRoute(agentObj, "/login", sendBody, jsonHeader200ObjCookie, noErrorObject, assertBodyNoRedirectObj);
//            await testGetRoute(agentObj, "/userProfil/picture", jsonHeader200ObjectNoCookie, noErrorObject, assertBodyNoRedirectObj)
//            agentObj.agent.close();
//        } catch (error: any) {
//            agentObj.agent.close();
//            throw error;
//        };
//    });
//});