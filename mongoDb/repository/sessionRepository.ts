import { Model, Schema } from "mongoose";
import { SessionInterface } from "../sessions/sessionInterface";
import { Repository, RepositoryInterface, RepositoryModel } from "./repositoryClass";

export interface SessionRepositoryInterface extends RepositoryInterface<SessionInterface> {
}

export class SessionRepository extends Repository<SessionInterface> implements SessionRepositoryInterface {
  constructor(readonly model: RepositoryModel<SessionInterface>) {
    super(model)
    this.model = model;
  };
};