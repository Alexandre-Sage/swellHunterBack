import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import http from "http";
import logger from "morgan";
//ROUTES 
import { Router } from "./routes/spotCreation/spotCreationRoute";
import { CorsOptions } from "cors";
import "dotenv/config";
import { Express } from "express";
import { Server } from "http";
//ROUTES 
import { SpotRepository } from "../mongoDb/repository/spotRepository";
import { database } from "../mongoDb/server/database";
import getAllSpot from "./routes/getAllSpot/getAllSpotRoute";
import getOneSpot from "./routes/getOneSpot/getOneSpotRoute";
import addSpotRoute from "./routes/spotCreation/spotCreationRoute";
import { SpotService } from "./service/spotService";
import { Repository, RepositoryInterface } from "../mongoDb/repository/repositoryClass";
import { ClassDeclaration, TokenClass } from "typescript";
interface SurfAppServerInterface<T, U> {
  readonly server: Express,
  readonly repository: U,
  readonly service: T;
  readonly corsOptions: CorsOptions
}
export class SurfAppServer<T, U> implements SurfAppServerInterface<T, U> {
  public httpServer: Server;
  public readonly secret: string;
  constructor(
    public readonly server: Express,
    public readonly repository: U,
    public readonly service: T,
    readonly corsOptions: CorsOptions
  ) {
    this.secret = `${process.env.COOKIE_SECRET}`;
    this.repository = repository;
    this.service = service;
    this.server = server;
    this.httpServer = {} as Server;
    this.corsOptions = corsOptions;
  };
}
export class ImageServer {
  public readonly repository: SpotRepository
  public readonly server: Express;
  private readonly corsOptions: CorsOptions;
  public readonly service: SpotService
  public httpServer: Server;
  private secret: string;
  constructor() {
    this.secret = `${process.env.COOKIE_SECRET}`;
    this.repository = database.spotRepository;
    this.service = new SpotService(this.repository)
    this.server = express()
    this.httpServer = {} as Server;
    this.corsOptions = {
      origin: [`${process.env.FRONT_END}`, `${process.env.HOST}`, "*"],
      methods: ["GET", "POST"],
      credentials: true
    }
  }
  init = () => {
    process.env.NODE_ENV === "developpment" ? this.server.use(logger("dev")) : null;
    this.server.set("trust proxy", 1);
    this.server.use(cors(this.corsOptions));
    this.server.use(express.static(`${process.cwd()}/src`))
    this.server.use(bodyParser.urlencoded({ extended: true, limit: "50M" }));
    this.server.use(cookieParser(this.secret))
    this.server.use(express.json());
  }
  createServer = () => {
    this.init()
    const router = new Router(this.service, "/spot").initRoutes()
    this.server.use("/spot/newSpot", router)
    // this.server.use("/spot/newSpot", addSpotRoute);
    this.server.use("/spot/getSpot", getOneSpot);
    this.server.use("/spot/getAllSpots", getAllSpot);
    this.httpServer = http.createServer(this.server);
    return {
      server: this.server, httpServer: this.httpServer, repository: this.repository, services: { service: this.service }
    }
  }
}
const { httpServer, server, repository, services } = new ImageServer().createServer()
httpServer.listen(process.env.PORT, () => {
  console.log(`Server listening on: ${process.env.PORT}`);
});
export default server
export { repository, services };

