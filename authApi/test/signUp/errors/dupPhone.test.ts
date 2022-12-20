import server from "../../../server";
import { dupPhoneObject } from "../signUpAssets";

import { expect } from "chai";
import chai from "chai";

export default function dupPhoneErrorTest(){
    describe("SIGN UP DUPLICATE PHONE ERROR",function(){
        it("Should handle posted sign up from and send dup phone error", async () => {
            const agent = chai.request.agent(server);
            const responseMessage=process.env.NODE_ENV==="developpment"?"ADD MONGO DOCUMENT ERROR SWITCH":"The phone 0606654654 is already used.";
            const contentType='application/json; charset=utf-8';
            const contentLength= process.env.NODE_ENV==="developpment"?'58':'64';
            try {
                const response = await agent.post("/auth/signUp").send(dupPhoneObject)
                const { header, body, clientError,serverError }=response;
                expect(clientError).to.be.eql(true);
                expect(serverError).to.be.eql(false);
                expect(response).to.have.property("status").eql(400);
                expect(body).to.have.property("message").eql(responseMessage);
                expect(header).to.have.property('content-type') .eql(contentType);
                expect(header).to.have.property('content-length').eql(contentLength);
                expect(header).to.have.property('access-control-allow-credentials').eql("true");
            } catch (error: any) {
                console.log(error)
                throw error
            };
        });
    });
};
//import { testGetRoute, testPostRoute } from "../../testModules/httpModule.test";
//import { jsonHeader200ObjCookie, jsonHeader400ObjectNoCookie, clientErrorObject, jsonHeader200ObjectNoCookie, assertBodyNoRedirectObj, noErrorObject, chaiAgent } from "../../globalsTestVar";

//export default describe("3.3) SHOULD RETURN DUPLICATE PHONE ERROR", function () {
//    it("Should post a new user and return error for duplicate phone", async () => {
//        const chai = chaiAgent();
//        const agentObj = { agent: chai.request.agent(server) };
//        const sendBody = { ...dupPhoneObject };
//        const message = "The phone 0606654654 is already used.";
//        const responseProperty = [
//            { propertyName: "message", propertyValue: message },
//            { propertyName: "error", propertyValue: true }
//        ];
//        const assertBodyObj = {
//            redirectsLength: 0,
//            propertyArray: responseProperty
//        };
//        try {
//            await testGetRoute(agentObj, "/csrf", jsonHeader200ObjCookie, noErrorObject, assertBodyNoRedirectObj)
//            await testPostRoute(agentObj, "/sign-up", sendBody, jsonHeader400ObjectNoCookie, clientErrorObject, assertBodyObj)
//        } catch (err) {
//            throw err
//        }
//    });
//});
