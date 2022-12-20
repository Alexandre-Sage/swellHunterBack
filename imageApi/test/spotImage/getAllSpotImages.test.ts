import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { database } from "../../../mongoDb/server/database";
import { getAuthentificationToken } from "../../../sharedModules/testModules/login";
import server from "../../server";
import { credentials, url } from "../fixtures/image.fixtures";
import { postSpotImageToDb } from "../helpers/postSpotImageToDb";
import { newImagesToInsert } from "./getAllSpotImage.fixture";


chai.use(chaiHttp)

const { mongoose } = database
export default describe("LOG IN AND GET USER PICTURES", function () {
  before(async () => {
    const { _id: spotId } = await mongoose.models.Spot.findOne({ spotName: "port blanc" }, { _id: 1, spotName: 1 })
    const newImages = await newImagesToInsert()
    newImages.forEach(image => {
      const { spotId, filePath, fileName } = image
      postSpotImageToDb({ fileName, filePath, spotId })
    });
    this.ctx.spotId = spotId
  })
  it("Should log in and get user all spot image", async () => {
    const agent = chai.request.agent(server);
    const contentType = 'application/json; charset=utf-8';
    try {
      const token: any = await getAuthentificationToken(url, credentials)
      const response = await agent.get(`/image/spotImage/${this.ctx.spotId}`).set("Authorization", `Bearer ${token.token}`);
      const { header, body, error } = response;
      expect(error).to.be.eql(false);
      expect(response).to.have.property("status").eql(200);
      expect(body.spotImages).to.be.a("array");
      expect(header).to.have.property('content-type').eql(contentType);
      expect(header).to.have.property('access-control-allow-credentials').eql("true");
    } catch (error: any) {
      throw error
    };
  });
});