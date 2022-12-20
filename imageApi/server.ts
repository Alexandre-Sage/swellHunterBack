import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import "dotenv/config";
import express, { Express } from "express";
import http, { Server } from "http";
import logger from "morgan";
//ROUTES 
import { ImageRepositoryInterface } from "../mongoDb/repository/imageRepository";
import { database } from "../mongoDb/server/database";
import spotImageUpload from "./routes/spotImage/spotImageRoute";
import { router as userImage } from "./routes/userImage";
import { ImageUploadService } from "./src/services/uploadService";
//declare module Express{
//  
//}

export class ImageServer {
  public readonly repository: ImageRepositoryInterface
  public readonly server: Express;
  private readonly corsOptions: CorsOptions;
  public readonly uploadService: ImageUploadService
  public httpServer: Server;
  private secret: string;
  constructor() {
    this.secret = `${process.env.COOKIE_SECRET}`;
    this.repository = database.imageRepository;
    this.uploadService = new ImageUploadService(this.repository)
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
    this.server.use("/image/userImage", userImage);
    this.server.use("/image/spotImage", spotImageUpload)
    this.httpServer = http.createServer(this.server);
    return {
      server: this.server, httpServer: this.httpServer, repository: this.repository, services: { uploadService: this.uploadService }
    }
  }
}
const { httpServer, server, repository, services } = new ImageServer().createServer()
httpServer.listen(process.env.PORT, () => {
  console.log(`Server listening on: ${process.env.PORT}`);
});
export default server
export { repository, services };
