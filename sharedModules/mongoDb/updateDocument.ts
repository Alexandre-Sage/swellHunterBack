import { connect } from "mongoose";
import { CustomError } from "../errors/errorClass";


export const updateDocument = async (mongoSchema: any, researchObject: any, field: any): Promise<boolean | Error> => {
  await connect(`mongodb+srv://AlexandreSage:Alexandretroisdemacedoinelegrand@cluster0.adoon.mongodb.net/surfApp?retryWrites=true&w=majority`, {
    autoIndex: true,
  });
  try {
    const doc = await mongoSchema.findOneAndUpdate(researchObject, field, {
      returnOriginal: false,
      new: false,
    })
    console.log(doc)
    return Promise.resolve(true)
  } catch (error) {
    return Promise.reject(new CustomError("Something wrong happened please try again", "ERROR UPDATE DOCUMENT", 400))
  }
}