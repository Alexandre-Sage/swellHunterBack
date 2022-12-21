import "mocha";
import { Database, database } from "../../mongoDb/server/database";
import { createSpot, spotFactory } from "./fixtures/session.fixture";
export const tearDown = () => after(async () => {
    const { mongoose } = database;
    try {
        await mongoose.models.Session.deleteMany();
        await mongoose.models.Spot.deleteMany();
    } catch (error) {
        throw error
    };
});
describe("Project set up test", () => {
    const { mongoose } = database;
    describe("SESSION API TEST SUITE", () => {
        require("./suites/add.test");
        require("./suites/getAll.test");
        require("./suites/getOne.test")
    })
    tearDown()
});