import "mocha";
import { database } from "../../mongoDb/server/database";
import { createSpot } from "../../sharedModules/testModules/createSpot";
import { credentials, getUserId, spotFactory } from "./fixtures/image.fixtures";

describe("IMAGE API", () => {
    const { mongoose } = database
    before(async () => {
        createSpot(spotFactory({}))
    })
    describe("I) IMAGE UPLOAD", () => {
        require("./userImageUpload/sucess")
        require("./userProfilImage/getAllUserProfilImages.test")
    });
    describe("II) SPOT IMAGE", () => {
        require("./spotImage/spotImageUpload.test");
        require("./spotImage/getAllSpotImages.test")
    })
    after(async () => {
        try {
            await mongoose.models.Image.deleteMany();
            await mongoose.models.Spot.deleteMany();
        } catch (error) {
            throw error
        };
    });
});



