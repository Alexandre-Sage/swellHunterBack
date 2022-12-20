import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { Suite } from "mocha";
import { getAuthentificationToken } from "../../../sharedModules/testModules/login";
import server from "../../server";
import { objectPropertyAssertion } from "../../../sharedModules/testModules/assertionModule";
import { credentials, url } from "../fixtures/image.fixtures";

chai.use(chaiHttp)


export default describe("LOG IN AND GET USER PICTURES", function () {
  it("Should log in and get user header json info", async () => {
    const agent = chai.request.agent(server);
    const contentType = 'application/json; charset=utf-8';
    try {
      const token: any = await getAuthentificationToken(url, credentials)
      const response = await agent.get("/image/userImage").set("Authorization", `Bearer ${token.token}`);
      const { header, body, error } = response;
      expect(error).to.be.eql(false);
      expect(response).to.have.property("status").eql(200);
      expect(body).to.be.a("array");
      expect(header).to.have.property('content-type').eql(contentType);
      expect(header).to.have.property('access-control-allow-credentials').eql("true");
    } catch (error: any) {
      throw error
    };
  });
});










