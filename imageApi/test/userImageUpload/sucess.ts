import fs from 'fs';
import server from "../../server";
import chai, { request, assert, should, expect, } from "chai";
import chaiHttp from "chai-http"
import { Suite } from "mocha";
import { getAuthentificationToken } from "../../../sharedModules/testModules/login"
import { credentials } from '../fixtures/image.fixtures';
const filePath = `test/userImageUpload/image.jpg`
const fileName = "image.jpg"
chai.use(chaiHttp)
const data = [{
    location: 'TestOne',
    name: 'TestOne',
    firstName: 'TestOne',
    userName: 'TestOne',
    creationDate: "2022-10-16T10:38:17.000Z"
}]
const url = `https://development.alexandre-sage-dev.fr/auth/logIn`
export default describe("LOG IN AND  UPLOAD AN IMAGE", function () {
    it("Should log in and post a new user image", async () => {
        const agent = chai.request.agent(server);
        const responseMessage = { message: "You're image was successfully uploaded.", error: false };
        const contentType = 'application/json; charset=utf-8';
        const contentLength = '67';
        const boundary = Math.random();
        try {
            const token: any = await getAuthentificationToken(url, credentials)
            const response = await agent.post("/image/userImage")
                .set("Authorization", `Bearer ${token.token}`)
                .set('Content-Type', 'multipart/form-data; boundary=' + boundary)
                .attach("image", fs.readFileSync(filePath), fileName);
            const { header, body, error } = response;
            expect(error).to.be.eql(false);
            expect(response).to.have.property("status").eql(200);
            expect(body).to.be.eql(responseMessage);
            expect(header).to.have.property('content-type').eql(contentType);
            expect(header).to.have.property('content-length').eql(contentLength);
            expect(header).to.have.property('access-control-allow-credentials').eql("true");
        } catch (error: any) {
            throw error
        };
    });
});

