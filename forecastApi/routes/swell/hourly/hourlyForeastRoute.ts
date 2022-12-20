import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fetch from "cross-fetch";
import { ForecastRequestInterface } from "../../../api/forecastApi";
import { json } from "stream/consumers";
const options = {};

interface WavesForecastObjectInterface {
  time: Array<string>,
  wavesHeight: Array<number>,
  wavesPeriod: Array<number>,
  wavesDirection: Array<number>,
};



export const hourlyWavesForecast = async (server: FastifyInstance) => (
  server.get("/swellForcast/:latitude/:longitude", options,
    async (request: FastifyRequest<{ Params: ForecastRequestInterface }>, reply: FastifyReply) => {
      const { timezone, latitude, longitude } = request.params;
      const url = "http://192.168.1.39:5001/smallSample"
      try {
        const waveForecast = await server.forecastApi.setForecast(url);
        return waveForecast;
      } catch (error) {
        return error;
      };
    }
  )
);

