import { SpotInterface } from "../../../mongoDb/spots/spotInterface";
import { UserInterface } from "../../../mongoDb/user/userInterface";
import { spotFactory } from "../../../spotApi/test/fixtures/spot.fixtures";
import { createSpot } from '../../../sharedModules/testModules/createSpot';
import { SessionInterface } from "../../../mongoDb/sessions/sessionInterface";
import { randomUUID } from "crypto";
import { createSession } from "../../../sharedModules/testModules/createSession"
const sessionId = [randomUUID(), randomUUID(), randomUUID()]

const sessionFactory = ({ spotId, userId, endTime, startTime, date, swell, wind, comment, _id }: Partial<SessionInterface>) => ({
  userId,
  date: date ?? new Date(),
  spotId,
  startTime: startTime ?? new Date(),
  endTime: endTime ?? new Date(),
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

const fakeSessionToAdd = (spotId: SpotInterface["_id"], userId: any) => {
  let sessions: Partial<SessionInterface>[] = []
  for (let i = 0; i < 6; i++) {
    sessions = [...sessions, sessionFactory({ spotId, userId })]
  }
  return sessions
}

export { sessionFactory, spotFactory, createSpot, fakeSessionToAdd }