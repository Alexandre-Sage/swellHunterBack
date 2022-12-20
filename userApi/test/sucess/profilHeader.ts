import server from "../../server";
import chai, { expect } from "chai";
import chaiHttp from "chai-http"
import { Suite } from "mocha";
import { getAuthentificationToken } from "../../../sharedModules/testModules/login"

chai.use(chaiHttp)

const url = `https://development.alexandre-sage-dev.fr/auth/logIn`
const data = [{
  location: 'TestOne',
  name: 'TestOne',
  firstName: 'TestOne',
  userName: 'TestOne',
  //creationDate: "2022-10-16T10:38:17.000Z"
}]
export default describe("LOG IN AND GET USER HEADER INFO", function () {
  it("Should log in and get user header json info", async () => {
    const agent = chai.request.agent(server);
    const credentials = { email: "test@testOne.com", password: "test" };
    const responseMessage = data;
    const contentType = 'application/json; charset=utf-8';
    const contentLength = '126';
    try {
      const token: any = await getAuthentificationToken(url, credentials)
      const response = await agent.get("/user/header").set("Authorization", `Bearer ${token.token}`);
      const { header, body, error } = response;
      expect(error).to.be.eql(false);
      expect(response).to.have.property("status").eql(200);
      expect(body[0]).to.have.property("creationDate");
      delete body[0].creationDate
      expect(body).to.be.eql(responseMessage);
      expect(header).to.have.property('content-type').eql(contentType);
      expect(header).to.have.property('content-length').eql(contentLength);
      expect(header).to.have.property('access-control-allow-credentials').eql("true");
    } catch (error: any) {
      throw error
    };
  });
});





