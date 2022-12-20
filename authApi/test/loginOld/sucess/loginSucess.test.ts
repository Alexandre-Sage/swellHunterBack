import server from "../../../server";
import chai, { request, assert, should, expect, } from "chai";
import chaiHttp from "chai-http"
import { Suite } from "mocha";
import { Response } from "express"
import { ServerResponse } from "http";

chai.use(chaiHttp)
const cookieName = (arrayIndex: number, response: any): string => {
    const { header } = response;
    const cookie = header["set-cookie"][arrayIndex]
    return cookie.split("=")[0];
}

export default function loginSucessTest(): Suite {
    return describe("LOG IN ROUTES SUCESSFULL", function () {
        it("Should handle posted log in from and authentificate the user", async () => {
            const agent = chai.request.agent(server);
            const credentials = { email: "test@testOne.com", password: "test" };
            const responseMessage = "Welcome back TestOne!";
            const contentType = 'application/json; charset=utf-8';
            const contentLength = '264';
            try {
                const response = await agent.post("/auth/logIn").send(credentials);
                const { header, body, error } = response;
                expect(error).to.be.eql(false)
                expect(response).to.have.property("status").eql(200);
                expect(body).to.have.property("message").eql(responseMessage);
                //expect(header).to.have.property("set-cookie");
                expect(header).to.have.property('content-type').eql(contentType);
                expect(header).to.have.property('content-length').eql(contentLength);
                expect(header).to.have.property('access-control-allow-credentials').eql("true");
                //expect(cookieName(0, response)).to.be.eql("JWT-TOKEN");
            } catch (error: any) {
                throw error
            };
        });
    });
};
export const loginFunction = async (agent: any, credentials: any, url: string) => {
    const responseMessage = "Welcome back TestOne!";
    const contentType = 'application/json; charset=utf-8';
    const contentLength = '49';
    try {
        const response = await agent.post(url).send(credentials);
        const { header, body, error } = response;
        expect(error).to.be.eql(false)
        expect(response).to.have.property("status").eql(200);
        expect(body).to.have.property("message").eql(responseMessage);
        expect(header).to.have.property("set-cookie");
        expect(header).to.have.property('content-type').eql(contentType);
        expect(header).to.have.property('content-length').eql(contentLength);
        expect(header).to.have.property('access-control-allow-credentials').eql("true");
        expect(cookieName(0, response)).to.be.eql("JWT-TOKEN");
        return agent
    } catch (error: any) {
        throw error
    };

}