import { missingPasswordObject } from "../signUpAssets";
import chai,{ expect } from "chai";
import server from "../../../server";


export default function missingPasswordErrorTest() {
    describe("SIGN UP MISSING PASSWORD ERROR",function(){
        it("Should handle posted sign up from and send missing password error", async () => {
            const agent = chai.request.agent(server);
            const responseMessage=process.env.NODE_ENV==="developpment"?"ADD MONGO DOCUMENT ERROR SWITCH":"The password's field is empty";
            const contentType='application/json; charset=utf-8';
            const contentLength= process.env.NODE_ENV==="developpment"?'58':'56';
            try {
                const response = await agent.post("/auth/signUp").send(missingPasswordObject)
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












//import server from "../../../../server";
//import { testGetRoute, testPostRoute } from "../../testModules/httpModule.test";
//import { jsonHeader200ObjCookie, jsonHeader400ObjectNoCookie, clientErrorObject, jsonHeader200ObjectNoCookie, assertBodyNoRedirectObj, noErrorObject, chaiAgent } from "../../globalsTestVar";
//
//export default describe("3.9) SHOULD RETURN MISSING PASSWORD ERROR", function () {
//    it("Should post a new user and return error for missing password", async () => {
//        const chai = chaiAgent();
//        const agentObj = { agent: chai.request.agent(server) };
//        const sendBody = missingPasswordObject;
//        const message = "The password's field is empty";
//        const responseProperty = [
//            { propertyName: "message", propertyValue: message },
//            { propertyName: "error", propertyValue: true }
//        ];
//        const assertBodyObj = {
//            redirectsLength: 0,
//            propertyArray: responseProperty
//        };
//        try {
//            await testGetRoute(agentObj, "/csrf", jsonHeader200ObjCookie, noErrorObject, assertBodyNoRedirectObj);
//            await testPostRoute(agentObj, "/sign-up", sendBody, jsonHeader400ObjectNoCookie, clientErrorObject, assertBodyObj);
//        } catch (err) {
//            throw err;
//        }
//    });
//});
//