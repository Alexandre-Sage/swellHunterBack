import { database } from "../../mongoDb/server/database";
import { SpotInterface } from "../../mongoDb/spots/spotInterface";
import { getUserId } from "./getUserId";

export const createSession = async (session: any) => {
  const { mongoose } = database;
  try {
    const credentials = { email: "test@testOne.com", password: "test" };
    const { userId } = await getUserId(credentials)
    await mongoose.models.Session.create({ ...session, userId })
  } catch (error) {
    throw error
  }
}