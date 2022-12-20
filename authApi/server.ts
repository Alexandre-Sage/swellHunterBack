import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import logger from "morgan";
//ROUTES 
import signUp from "./routes/signUp/signUp";
import logIn from "./routes/login/login";
import testRoute from "./routes/testRoute"

import mongoose from "mongoose";
import { UserSchema } from "../mongoDb/user/users";

const server = express();
console.log(process.env.PORT)
process.env.NODE_ENV === "developpment" ? server.use(logger("dev")) : null;
server.set("trust proxy", 1);

server.use(cors({
  origin: [`${process.env.FRONT_END}`, `${process.env.HOST}`],
  methods: ["GET", "POST"],
  credentials: true
}));
const db = mongoose.createConnection(`${process.env.MONGO_ATLAS}`, {
  autoIndex: true,
});
db.model("User", UserSchema);
server.locals.db = db;
//console.log(server.locals.db)
//console.log(db.models.User.find())
server.use(express.static(`${process.cwd()}/src`))
server.use(bodyParser.urlencoded({ extended: true, limit: "50M" }));
server.use(cookieParser(process.env.COOKIE_SECRET))
server.use(express.json());
server.use("/auth/signUp", signUp);
server.use("/auth/logIn", logIn);
server.use("/auth", testRoute)
//mongoose.connect(`${process.env.MONGO_ATLAS}`)
const httpServer = http.createServer(server);
httpServer.listen(process.env.PORT, () => {
  console.log(`Server listening on: ${process.env.PORT}`);
});
export default server;