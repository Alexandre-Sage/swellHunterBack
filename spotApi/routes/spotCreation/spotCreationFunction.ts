import validator from "validator";
import { SpotInterface } from "../../../mongoDb/spots/spotInterface";
import { notEmptyCheck } from "../../../sharedModules/dataValidation/notEmpty";

export const spotValidatior = async (requestBody: SpotInterface): Promise<boolean> => {
  const { location, type, orientation, sessions, optimalConditions, ...bodyCopy } = requestBody;
  const { isEmpty } = validator;
  const validationPromise = [notEmptyCheck(bodyCopy), notEmptyCheck(location.type), notEmptyCheck(type)]
  try {
    await Promise.all(validationPromise)
    location.coordinates.forEach(item => isEmpty(item as string))
    orientation.forEach(item => isEmpty(item as string));
    if (optimalConditions && optimalConditions.swell) {
      //await notEmptyCheck(optimalConditions.swell)
      //await notEmptyCheck(optimalConditions.wind)
    }
    return true
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}


//export async function spotCreation(requestBody: SpotInterface, userId: any) {
//  try {
//    const newSpot = new Spot<SpotInterface>({
//      ...requestBody,
//      userId,
//      creationDate: new Date()
//    });
//    const document = await addMongoDocument(newSpot);
//    return document;
//  } catch (error: any) {
//    console.log({ error })
//    throw error
//  }
//};
