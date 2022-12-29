import { SpotInterface } from "../../../mongoDb/spots/spotInterface";

const spotFactory = (spot: Partial<SpotInterface>) => {
  const { country, creationDate, optimalConditions, orientation, location, type, picture, sessions, userId, spotName } = spot
  return ({
    userId,
    spotName: spotName ?? "port blanc",
    country: country ?? "France",
    type: type ?? {
      waveType: "Shore break",
      bottomType: "Sand",
    },
    location: location ?? {
      type: "Point",
      coordinates: ["47.52408959", "-3.1545563"]
    },
    orientation: orientation ?? ["W", "N/W", "WN/W"],
    optimalConditions: optimalConditions ?? {
      wind: {
        orientation: "NE",
        strength: "12kno"
      },
      swell: {
        orientation: "SW",
        period: "12s",
        size: "2m"
      }
    },
    creationDate: creationDate //?? new Date().toUTCString()
  });
};
export { spotFactory };
