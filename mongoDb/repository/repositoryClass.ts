import { ObjectId } from "mongodb";
import { Document, Model, Schema, Types } from "mongoose";
import { UserInterface } from "../user/userInterface";

export interface RepositoryInterface {
  create: ({ }: { userId: UserInterface["_id"], newData: unknown }) => Promise<void>;
  getAll: ({ }: { userId: UserInterface["_id"], filter?: any }) => Promise<Document[]>;
  getById: ({ }: { _id: _Id, userId: UserInterface["_id"], filter?: any }) => Promise<Document | null>;
  update: ({ }: { _id: _Id, userId: UserInterface["_id"], dataToUpdate: any }) => Promise<void>
}

type _Id = Types.ObjectId
type RepositoryModel = Model<any, {}, {}, {}, Schema<any>>
export class Repository implements RepositoryInterface {
  constructor(readonly model: RepositoryModel) {
    this.model = model;
  };
  create = async ({ userId, newData }: { userId: UserInterface["_id"]; newData: any; }) => {
    const newDocument = new this.model({
      ...newData,
      userId
    });
    this.model.create(newDocument);
  };
  getAll = async ({ userId, filter }: { userId: UserInterface["_id"], filter?: any }) => {
    return this.model.find({ userId }, { ...filter });
  };
  getById = async ({ _id, userId, filter }: { _id: _Id, userId: UserInterface["_id"], filter?: any }) => {
    return this.model.findOne({ _id: new ObjectId(_id), userId }, { ...filter });
  };
  update = async ({ _id, dataToUpdate, userId }: { _id: _Id, userId: UserInterface["_id"], dataToUpdate: any }) => {
    this.model.findOneAndUpdate({ _id: new ObjectId(_id), userId }, {
      ...dataToUpdate,
      userId
    });
  };
  delete = async ({ _id, userId }: { _id: _Id, userId: UserInterface["_id"] }) => {
    this.model.findOneAndDelete({ _id, userId })
  }
};

