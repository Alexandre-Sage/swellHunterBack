import "mocha";
import { Database, database } from "../../mongoDb/server/database";
import { createSpot, spotFactory } from "./fixtures/session.fixture";

describe("Project set up test", () => {
    const { mongoose } = database;
    before(() => {
        createSpot(spotFactory({}))
    })
    describe("SESSION API TEST SUITE",()=>{
        require("./suites/add.test")
    })
    after(async () => {
        try {
            //await mongoose.models.Image.deleteMany();
            await mongoose.models.Spot.deleteMany();
        } catch (error) {
            throw error
        };
    });
});