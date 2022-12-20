import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express, { Express } from "express";
import http from "http";
import logger from "morgan";
import { SessionRepository, SessionRepositoryInterface } from "../mongoDb/repository/sessionRepository";
import { database } from "../mongoDb/server/database";
import { router as sessionRouter } from "./routes/sessionRoute/sessionRoute";
import { SessionService } from "./services/sessionService";

const corsOptions = {
    origin: [`${process.env.FRONT_END}`, `${process.env.HOST}`, "*"],
    methods: ["GET", "POST"],
    credentials: true
}
interface SessionServer {
    server: Express,
    repository: SessionRepository
    service: SessionService

}

const setServerOptions = ({ server }: { server: Express }) => {
    server.use(logger("dev"))
    server.set("trust proxy", 1);
    server.use(cors(corsOptions));
    server.use(bodyParser.urlencoded({ extended: true, limit: "50M" }));
    server.use(express.json());
    return server;
}

const setRoute = ({ server }: { server: Express }) => {
    server.use("/sessionApi/sessions", sessionRouter)
}

const sessionServer = ({ server, repository, service }: SessionServer) => {
    setServerOptions({ server })
    setRoute({ server });
    return {
        httpServer: http.createServer(server),
        server,
        repository,
        service
    }
}


export const { httpServer, repository, server, service } = sessionServer({
    server: express(),
    repository: database.sessionRepository,
    service: new SessionService(database.sessionRepository)
})

httpServer.listen(process.env.PORT, () => {
    console.log(`Server listening on: ${process.env.PORT}`);
});
