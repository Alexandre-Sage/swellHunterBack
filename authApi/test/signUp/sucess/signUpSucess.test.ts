import server from "../../../server";
import { userObject } from "../signUpAssets";
import chai, { request, assert, should, expect } from "chai";
import chaiHttp from "chai-http"
import { Suite, SuiteFunction } from "mocha";

chai.use(chaiHttp)
//export default function testSign(): Suite {
    /* return */export default describe("SIGN UP ROUTES SUCESSFULL", function () {
    it("Should handle posted sign up from and create a new user", async () => {
        const agent = chai.request.agent(server);
        const responseMessage = "User was sucessfully created";
        const contentType = 'application/json; charset=utf-8';
        const contentLength = '56';
        try {
            const response = await agent.post("/auth/signUp").send(userObject)
            const { header, body, error } = response;
            expect(error).to.be.eql(false)
            expect(response).to.have.property("status").eql(200);
            expect(body).to.have.property("message").eql(responseMessage)
            expect(header).to.have.property('content-type').eql(contentType)
            expect(header).to.have.property('content-length').eql(contentLength)
            expect(header).to.have.property('access-control-allow-credentials').eql("true")
        } catch (error: any) {
            throw error
        };
    });
});
//};