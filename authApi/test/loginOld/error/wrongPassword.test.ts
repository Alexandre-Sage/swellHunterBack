import chai, { expect } from "chai";
import server from "../../../server";


export default function logInWrongPassworeErrorTest() {
    describe("LOG IN WRONG PASSWORD ERROR", function () {
        it("Should handle posted log in from and send wrong password error", async () => {
            const agent = chai.request.agent(server);
            const responseMessage = process.env.NODE_ENV === "developpment" ? "ADD MONGO DOCUMENT ERROR SWITCH" : "Invalid password";
            const contentType = 'application/json; charset=utf-8';
            const contentLength = process.env.NODE_ENV === "developpment" ? '58' : '43';
            const credentials = { email: "test@testOne.com", password: "testee" };
            try {
                const response = await agent.post("/auth/logIn").send(credentials)
                const { header, body, clientError, serverError } = response;
                expect(clientError).to.be.eql(true);
                expect(serverError).to.be.eql(false);
                expect(response).to.have.property("status").eql(400);
                expect(body).to.have.property("message").eql(responseMessage);
                expect(header).to.have.property('content-type').eql(contentType);
                expect(header).to.have.property('content-length').eql(contentLength);
                expect(header).to.have.property('access-control-allow-credentials').eql("true");
            } catch (error: any) {
                console.log(error)
                throw error
            };
        });
    });
};


