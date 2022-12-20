import { SessionRepository } from "../../mongoDb/repository/sessionRepository";
import { SessionInterface } from "../../mongoDb/sessions/sessionInterface";
import { UserInterface } from "../../mongoDb/user/userInterface";
import { CustomError } from "../../sharedModules/errors/errorClass";

interface SessionServiceInterface {
  create: ({ userId, newData }: { userId: UserInterface["_id"], newData: SessionInterface }) => Promise<void>
  getAll: (userId: UserInterface["_id"]) => Promise<SessionInterface[]>
}

export class SessionService implements SessionServiceInterface {
  private readonly validator: any
  constructor(private readonly repository: SessionRepository) {
    this.repository = repository;

  };
  create = async ({ userId, newData }: { userId: UserInterface["_id"], newData: SessionInterface }) => {
    try {
      await this.repository.create({ userId, newData });
    } catch (error) {
      throw new CustomError("Something wrong happened please retry", "createSession", 500)
    }
  };
  getAll = async (userId: UserInterface["_id"]) => {
    try {
      return this.repository.getAll({ userId })
    } catch (error) {
      throw new CustomError("Something wrong happened please retry", "getAllSession", 500)
    }
  }
}
