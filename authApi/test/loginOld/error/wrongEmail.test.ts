
import chai,{ expect } from "chai";
import server from "../../../server";


export default function logInWrongEmailErrorTest() {
    describe("LOG IN WRONG EMAIL ERROR",function(){
        it("Should handle posted log in from and send wrong email error", async () => {
            const agent = chai.request.agent(server);
            const responseMessage=process.env.NODE_ENV==="developpment"?"ADD MONGO DOCUMENT ERROR SWITCH":"email: inexisting@testOne.com not found please retry";
            const contentType='application/json; charset=utf-8';
            const contentLength= process.env.NODE_ENV==="developpment"?'58':'79';
            const credentials = { email: "inexisting@testOne.com", password: "qsdqsd" };
            try {
                const response = await agent.post("/auth/logIn").send(credentials)
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
    






// import server from "../../../../server";
// import { testGetRoute, testPostRoute } from "../../testModules/httpModule.test";
// import { jsonHeader200ObjCookie, jsonHeader200ObjectNoCookie, jsonHeader400ObjectNoCookie, assertBodyNoRedirectObj, noErrorObject, clientErrorObject, chaiAgent } from "../../globalsTestVar";

// export default describe("2.3) WRONG EMAIL ERROR", function () {
//     it("Should raise an error for wrong email", async () => {
//         const chai = chaiAgent();
//         const agentObj = { agent: chai.request.agent(server) };
//         
//         const message = "email: inexisting@testOne.com not found please retry";
//         const responseProperty = [
//             { propertyName: "message", propertyValue: message },
//             { propertyName: "error", propertyValue: true }
//         ];
//         const assertBodyObj = {
//             redirectsLength: 0,
//             propertyArray: responseProperty
//         };
//         try {
//             await testGetRoute(agentObj, "/csrf", jsonHeader200ObjCookie, noErrorObject, assertBodyNoRedirectObj)
//             await testPostRoute(agentObj, "/login", sendBody, jsonHeader400ObjectNoCookie, clientErrorObject, assertBodyObj)
//             agentObj.agent.close()
//         } catch (error: any) {
//             agentObj.agent.close()
//             throw error
//         };
//     });
// });