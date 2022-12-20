import { spotFactory } from "../../../spotApi/test/fixtures/spot.fixtures";
import { getUserId } from "../../../sharedModules/testModules/getUserId";
import {createSpot} from "../../../sharedModules/testModules/createSpot";
const credentials = { email: "test@testOne.com", password: "test" };
const url = `https://development.alexandre-sage-dev.fr/auth/logIn`
export { spotFactory, getUserId, credentials, url };