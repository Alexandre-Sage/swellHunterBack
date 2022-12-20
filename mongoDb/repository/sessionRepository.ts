import { Model, Schema } from "mongoose";
import { SessionInterface } from "../sessions/sessionInterface";
import { Repository, RepositoryInterface } from "./repositoryClass";

export interface SessionRepositoryInterface extends RepositoryInterface {
}

export class SessionRepository extends Repository implements SessionRepositoryInterface {
  constructor(readonly model: Model<SessionInterface, {}, {}, {}, Schema<SessionInterface>>) {
    super(model)
    this.model = model;
  };
};