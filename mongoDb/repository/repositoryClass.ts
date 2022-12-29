import { ObjectId } from "mongodb";
import { Document, HydratedDocument, Model, Schema, Types } from "mongoose";
import { SpotInterface } from "../spots/spotInterface";
import { UserInterface } from "../user/userInterface";


export interface RepositoryInterface<T> {
  create: ({ }: { userId: UserInterface["_id"], newData: T }) => Promise<void>;
  getAll: ({ }: { userId: UserInterface["_id"], filter?: MongoFilterType<T> }) => Promise<HydratedDocument<T, {}, {}>[]>;
  getById: ({ }: { _id: _Id, userId: UserInterface["_id"], filter?: MongoFilterType<T> }) => Promise<HydratedDocument<T, {}, {}> | null>;
  update: ({ }: { _id: _Id, userId: UserInterface["_id"], dataToUpdate: T }) => Promise<void>;
  // filter: (filter: any) => Object | undefined
}

export type InterfaceToFilterTypeMapper<T> = {
  [Property in keyof T]: number
}
export type MongoFilterType<T> = Partial<InterfaceToFilterTypeMapper<T>>

export type _Id = Types.ObjectId
export type RepositoryModel<T> = Model<T, {}, {}, {}, Schema<T>>
export type MongoDocument<T> = Document<unknown, any, T>
export class Repository<T> implements RepositoryInterface<T> {
  constructor(readonly model: RepositoryModel<T>) {
    this.model = model;
  };
  create = async ({ userId, newData }: { userId: UserInterface["_id"]; newData: T; }) => {
    const newDocument = new this.model({
      ...newData,
      userId
    });
    this.model.create(newDocument);
  };
  getAll = async ({ userId, filter }: { userId: UserInterface["_id"], filter?: MongoFilterType<T> }) => {
    return await this.model.find({ userId }, { ...filter });
  };
  getById = async ({ _id, userId, filter }: { _id: _Id, userId: UserInterface["_id"], filter?: MongoFilterType<T> }) => {
    return this.model.findOne({ _id: new ObjectId(_id), userId }, { ...filter });
  };
  update = async ({ _id, dataToUpdate, userId }: { _id: _Id, userId: UserInterface["_id"], dataToUpdate: T }) => {
    this.model.findOneAndUpdate({ _id: new ObjectId(_id), userId }, {
      ...dataToUpdate,
      userId
    });
  };
  delete = async ({ _id, userId }: { _id: _Id, userId: UserInterface["_id"] }) => {
    this.model.findOneAndDelete({ _id, userId })
  }
};

