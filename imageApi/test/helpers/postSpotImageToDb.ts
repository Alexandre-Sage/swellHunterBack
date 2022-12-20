import { getAuthentificationToken } from "../../../sharedModules/testModules/login";
import { SpotInterface } from "../../../mongoDb/spots/spotInterface"
import fs from 'fs';
import server from "../../server";
const url = `https://development.alexandre-sage-dev.fr/auth/logIn`
export const postSpotImageToDb = async (
  { fileName, filePath, spotId }:
    { filePath: string, fileName: string, spotId: SpotInterface["_id"] }
) => {
  const credentials = { email: "test@testOne.com", password: "test" };
  const token: any = await getAuthentificationToken(url, credentials)
  const agent = chai.request.agent(server);
  const boundary = Math.random();
  await agent.post(`/image/spotImageUpload/${spotId}`)
    .set("Authorization", `Bearer ${token.token}`)
    .set('Content-Type', 'multipart/form-data; boundary=' + boundary)
    .attach("image", fs.readFileSync(filePath), fileName);
};