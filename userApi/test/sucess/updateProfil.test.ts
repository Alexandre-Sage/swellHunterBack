import server from "../../server";
import chai, { expect } from "chai";
import chaiHttp from "chai-http"
import { Suite } from "mocha";
import { getAuthentificationToken } from "../../../sharedModules/testModules/login"
import { createUser } from "../../../authApi/routes/signUp/modules/createUser"
import { UserInterface } from "../../../mongoDb/user/userInterface";
import { User } from "../../../mongoDb/user/users";
import { database } from "../../../mongoDb/server/database";
//import registry from "../../../../urlRegistry"
//const { devloppmentServer } = registry;
import { addMongoDocument } from "../../../sharedModules/mongoDb/addMongoDocument"
import { connect } from "mongoose";
chai.use(chaiHttp)

const url = `https://development.alexandre-sage-dev.fr/auth/logIn`
const userObject = {
  location: "TestTwo",
  name: "TestTwo",
  firstName: "TestTwo",
  userName: "TestTwo",
  email: "test@testTwo.com",
  phone: "070706060",
  password: "test",
  creationDate: new Date(),
  lastConnection: new Date()
} as UserInterface;

const userUpdateObject = {
  location: "updated",
  name: "updated",
  firstName: "updated",
  userName: "updated",
  email: "test@updated.com",
  phone: "060606060",
  password: "test",
  creationDate: new Date(),
  lastConnection: new Date()
} as UserInterface;

const deleteFromDb = async (mongoDocument: any, searchObject: any) => {
  try {
    await connect(`mongodb+srv://AlexandreSage:Alexandretroisdemacedoinelegrand@cluster0.adoon.mongodb.net/surfApp?retryWrites=true&w=majority`, {
      autoIndex: true,
    })
    await mongoDocument.findOneAndDelete({ ...searchObject })
  } catch (error) {
    throw error
  }
}

export default describe("LOG IN AND UPDATE USER INFO  ", function () {
  before(async () => {
    try {
      database.userRepository.createNewUser({ newUserData: userObject });
      database.userRepository.hardDeleteUserByUserName("updated");
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
  it("Should log in and get user header json info", async () => {
    const agent = chai.request.agent(server);
    const credentials = { email: "test@testTwo.com", password: "test" };
    const responseMessage = "Profil sucessfully updated";
    const contentType = 'application/json; charset=utf-8';
    const contentLength = '54';
    try {
      const token: any = await getAuthentificationToken(url, credentials)
      console.log(token)
      const response = await agent
        .post("/user/updateProfil")
        .set("Authorization", `Bearer ${token.token}`)
        .send(userUpdateObject)
      const { header, body, error } = response;
      expect(error).to.be.eql(false);
      expect(response).to.have.property("status").eql(200);
      expect(body.message).to.be.eql(responseMessage);
      expect(body.error).to.be.eql(false)
      expect(header).to.have.property('content-length').eql(contentLength);
      expect(header).to.have.property('content-type').eql(contentType);
      expect(header).to.have.property('access-control-allow-credentials').eql("true");
    } catch (error: any) {
      throw error
    };
  });
});





