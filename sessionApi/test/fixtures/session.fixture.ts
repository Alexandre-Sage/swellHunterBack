import { SpotInterface } from "../../../mongoDb/spots/spotInterface";
import { UserInterface } from "../../../mongoDb/user/userInterface";
import { spotFactory } from "../../../spotApi/test/fixtures/spot.fixtures";
import { createSpot } from '../../../sharedModules/testModules/createSpot';
import { SessionInterface } from "../../../mongoDb/sessions/sessionInterface";
import { randomUUID } from "crypto";

const sessionId = [randomUUID(), randomUUID()]

const sessionFactory = ({ spotId, userId, endTime, startTime, date, swell, wind, comment }: Partial<SessionInterface>) => ({
  userId,
  date: date ?? new Date().toUTCString(),
  spotId,
  startTime: startTime ?? new Date().toUTCString(),
  endTime: endTime ?? new Date().toUTCString(),
  swell: swell ?? {
    size: "2m",
    period: "12s",
    orientation: "NO"
  },
  wind: wind ?? {
    strength: "12knot",
    orientation: "E"
  },
  comment: comment ?? "Something to say about"
});

export { sessionFactory, spotFactory, createSpot }