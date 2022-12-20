import fastify, { FastifyInstance, RouteShorthandOptions, FastifyBodyParser } from "fastify";
import env, { fastifyEnvOpt } from "@fastify/env";
import { CustomError } from "../sharedModules/errors/errorClass";
import { ForecastApi } from "./api/forecastApi";
import { hourlyWavesForecast } from "./routes/swell/hourly/hourlyForeastRoute";
import { tideForecast } from "./routes/tides/tides";
declare module "fastify" {
  interface FastifyInstance {
    database: any;
    forecastApi: ForecastApi;
    customError: (param: string, param2: number) => CustomError
  }
}

//const envSchema: fastifyEnvOpt = {
//  dotenv: true
//}
export class Server {
  readonly server: FastifyInstance;
  private dotenvOptions: fastifyEnvOpt;
  constructor(private routes: any[], private port: number) {
    this.server = fastify({
      logger: {
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        }
      },
      jsonShorthand: true
    });
    this.dotenvOptions = {
      dotenv: true,
      schema: {
        //confKey: "env"
      }
    }
    this.routes = routes;
    this.port = port;
  };

  async build() {
    try {
      await this.server.register(env, this.dotenvOptions);
      this.server.customError = (param1: string, param2: number) => new CustomError(param1, param1, param2);
      this.server.forecastApi = new ForecastApi(this.server);
      this.routes.map(async route => await this.server.register(route));
    } catch (err) {
      throw err;
    }
  };
  async startServer() {
    try {
      await this.build();
      await this.server.listen({ port: this.port });
      const address = this.server.server.address();
      const port = typeof address === "string" ? address : address?.port;
      return this.server;
    } catch (error) {
      throw error;
    };
  };
  async stopServer() {
    this.server.close()
  }
}
export const routes = [hourlyWavesForecast, tideForecast];
new Server(routes, 5000).startServer()
