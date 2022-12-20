import mocha from "mocha"
//import uploadUserImage from "./imageApi/test/userImageUpload/sucess"
import { } from "./authApi/test/signUp/sucess/signUpSucess.test";
import { database } from "./mongoDb/server/database";
import { SpotInterface } from "./mongoDb/spots/spotInterface";
import { UserInterface } from "./mongoDb/user/userInterface";
import { spotFactory } from "./spotApi/test/fixtures/spot.fixtures";
import { getAuthentificationToken } from "./sharedModules/testModules/login";
const credentials = { email: "test@testOne.com", password: "test" };
const url = `https://development.alexandre-sage-dev.fr/auth/logIn`

const portBlanc = {
  type: "Point",
  coordinates: ["47.52408959", "-3.1545563"]
};

describe("#######################################POPULATE DB#######################################", () => {
  describe("CREATE USER", () => {
    require("./authApi/test/signUp/sucess/signUpSucess.test")
  });
  describe('ADD USER IMAGE', () => {
    for (let i = 0; i <= 6; i++) {
      require("./imageApi/test/userImageUpload/sucess")
    };
  });
  describe("ADD SPOT TO DATABASE", async () => {
    const { userId } = (await getAuthentificationToken(url, credentials)).token;
    const spots = [{ spotName: "Port blanc", userId, location: portBlanc }, {}, {}]
    const newData = spotFactory(spots[1] as unknown as SpotInterface);
    console.log(userId)
    database.spotRepository.create({ userId, newData })
  });
});