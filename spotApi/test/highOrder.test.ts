import "mocha";
import mongoose from "mongoose";
import { SpotSchema } from "../../mongoDb/spots/spot";
import { database } from "../../mongoDb/server/database";
describe("################################## SPOT API TEST SUITE ##################################", () => {
  after(async () => {
    try {
      await database.mongoose.models.Spot.deleteMany()
    } catch (error) {
      throw error
    };
  });
  describe("Should say Hello World", () => {
    require("./spot/sucess/addSpotSucess.test")
    require("./spot/sucess/getOneSpot.test")
    require("./spot/sucess/getSpots.test")
  });
});