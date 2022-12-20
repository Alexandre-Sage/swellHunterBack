import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fetch from "cross-fetch";
import { ForecastRequestInterface } from "../../api/forecastApi";
import { json } from "stream/consumers";
const options = {};

interface WavesForecastObjectInterface {
  time: Array<string>,
  wavesHeight: Array<number>,
  wavesPeriod: Array<number>,
  wavesDirection: Array<number>,
};



export const tideForecast = async (server: FastifyInstance) => (
  server.get("/tide/:latitude/:longitude", options,
    async (request: FastifyRequest<{ Params: ForecastRequestInterface }>, reply: FastifyReply) => {
      const { latitude, longitude } = request.params;
      const url = "http://192.168.1.39:5001/tideSample"
      try {
        const tideForecast = await server.forecastApi.tideForecast(url);
        const lowToHigh = tideForecast.map((tide: any, index: number) => [tideForecast.shift(), tideForecast.shift()]);
        return lowToHigh;
      } catch (error) {
        return error;
      };
    }
  )
);
