import "mocha";
import { Database, database } from "../../mongoDb/server/database";
import { createSpot, spotFactory } from "./fixtures/session.fixture";

describe("Project set up test", () => {
    const { mongoose } = database;
    before(() => {
        createSpot(spotFactory({}))
    })
    describe("SESSION API TEST SUITE", () => {
        require("./suites/add.test");
        require("./suites/getAll.test")
    })
    after(async () => {
        try {
            await mongoose.models.Session.deleteMany();
            await mongoose.models.Spot.deleteMany();
        } catch (error) {
            throw error
        };
    });
});