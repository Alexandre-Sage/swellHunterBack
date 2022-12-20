import "mocha";
import chaiHttp from "chai-http"
import chai, { expect } from "chai";
import { Server, routes } from "../server"
import { time } from "console";
import { url } from "inspector";

//http://localhost:5000/swellForcast/3.2928029506472734/47.59130712336542
describe("FORECAST API TEST SUITE", () => {
  it("Should get waves forecast", async () => {
    const date = new Date(Date.now()).toISOString().split(".")[0]
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const longitude = "47.59130712336542";
    const latitude = "-3.2928029506472734";
    const server = await new Server(routes, 5000).startServer()
    try {
      const response = await server.inject({
        url: `/swellForcast/${latitude}/${longitude}`,
        headers: {
          "Content-Type": "application/json",
        }
      });
      expect(response).to.have.property("statusCode").eql(200);
      server.close()
    } catch (error) {
      server.close()
      throw error;
    }
  });
  it.only("Should get tide forecast", async () => {
    const longitude = "47.59130712336542";
    const latitude = "-3.2928029506472734";
    try {
      const server = await new Server(routes, 5000).startServer()
      const response = await server.inject({
        url: `/tide/${latitude}/${longitude}`,
        headers: {
          "Content-Type": "application/json",
        }
      });
      expect(response).to.have.property("statusCode").eql(200);
    } catch (error) {
      throw error;
    }
  });
});
