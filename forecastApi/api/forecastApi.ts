import fastify, { FastifyInstance } from "fastify";
import fetch from "cross-fetch";

export interface ForecastRequestInterface {
  timezone: string,
  latitude: string,
  longitude: string,
};

export class ForecastApi {
  constructor(private server: FastifyInstance) {
    this.server = server;
  };
  async fetchForecast(url: string) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response)
      return response.json()
    } catch (error) {
      throw this.server.customError("Something wrong happened please try again", 407)
    };
  };
  windForecast = (globalForecast: any[]) => globalForecast.map(item => {
    const { windDirection, windSpeed, time } = item;
    return {
      windDirection: this.median(windDirection),
      windSpeed: this.median(windSpeed),
      time
    };
  });
  swellForecast = (globalForecast: any[]) => globalForecast.map(item => {
    const { swellDirection, swellHeight, swellPeriod, time } = item;
    return {
      swellDirection: this.median(swellDirection),
      swellHeight: this.median(swellHeight),
      swellPeriod: this.median(swellPeriod),
      time
    };
  });
  secondarySwellForecast = (globalForecast: any[]) => globalForecast.map(item => {
    const { secondarySwellDirection, secondarySwellHeight, secondarySwellPeriod, time } = item;
    return {
      secondarySwellDirection: this.median(secondarySwellDirection),
      secondarySwellHeight: this.median(secondarySwellHeight),
      secondarySwellPeriod: this.median(secondarySwellPeriod),
      time
    };
  });
  wavesForecast = (globalForecast: any[]) => globalForecast.map(item => {
    const { waveDirection, waveHeight, wavePeriod, time } = item;
    return {
      waveDirection: this.median(waveDirection),
      waveHeight: this.median(waveHeight),
      wavePeriod: this.median(wavePeriod),
      time
    };
  });
  windWavesForecast = (globalForecast: any[]) => globalForecast.map(item => {
    const { windWaveDirection, windWaveHeight, windWavePeriod, time } = item;
    return {
      windWaveDirection: this.median(windWaveDirection),
      windWaveHeight: this.median(windWaveHeight),
      windWavePeriod: this.median(windWavePeriod),
      time
    };
  });
  secondaryForecast = (globalForecast: any[]) => globalForecast.map(item => {
    const { airTemperature, waterTemperature, seaLevel, time } = item;
    return {
      airTemperature: this.median(airTemperature),
      waterTemperature: this.median(waterTemperature),
      seaLevel: this.median(seaLevel),
      time
    };
  });
  median(object: any): number {
    const median = Object.values(object) as any
    const returned: number = median.reduce((item: any, des: any) => item += des) / median.length
    return parseFloat(returned.toFixed(2))
  };
  makeFullForecastObject(globalForecast: any[]) {
    return {
      secondaryForecast: this.secondaryForecast(globalForecast),
      wavesForecast: this.wavesForecast(globalForecast),
      windForecast: this.windForecast(globalForecast),
      secondarySwellForecast: this.secondarySwellForecast(globalForecast),
      swellForecast: this.swellForecast(globalForecast),
      windWavesForecast: this.windWavesForecast(globalForecast),
    };
  };
  async setForecast(url: string) {
    try {
      const body = await this.fetchForecast(url);
      //body.hours
      return this.makeFullForecastObject(body)
    } catch (error) {
      throw error
    };
  };
  async tideForecast(url: string) {
    try {
      const response = await this.fetchForecast(url);
      return response;
    } catch (error) {
      throw error
    }

  }
};
