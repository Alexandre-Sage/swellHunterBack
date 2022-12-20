import mongoose, { connect, disconnect, HydratedDocument } from "mongoose";
import { CustomError } from "../errors/errorClass";
import { database, Database } from "../../mongoDb/server/database"
console.log(database.models)
//635cf1f59deea638d72a793c console.log("getAllDocument modified not tested")
export async function fetchAllDocument(mongoSchema: Database, researchObject: object, field?: object, sortObject?: object): Promise<Document> {
  type ObjectKey = keyof typeof researchObject;
  const errorKey = `${Object.keys(researchObject)[0]}` as ObjectKey;
  const errorMessage = `${Object.keys(researchObject)[0]}: ${researchObject[errorKey]} not found please retry`;
  try {
    //await connect(`${process.env.MONGO_ATLAS}`, {
    //  autoIndex: true,
    //})
    const document = await database.models[mongoSchema].find(researchObject, field ? field : undefined)
    return new Promise((resolve: Function, reject: Function) => (
      document ? resolve(document) : reject(new CustomError(errorMessage, "FETCH ALL DOCUMENT ERROR", 400))
    ));

  } catch (error: any) {
    console.error(error)
    return Promise.reject(new CustomError("Something wrong happened please retry ", "FETCH ALL DOCUMENT ERROR", 403))
  };
};


