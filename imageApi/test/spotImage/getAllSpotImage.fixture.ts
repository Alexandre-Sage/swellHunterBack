import { database } from "../../../mongoDb/server/database"

const { mongoose } = database
export const imageFactory = async ({ filePath, fileName }: { filePath: string, fileName: string }) => {
  const { _id: spotId } = await mongoose.models.Spot.findOne({ spotName: "port blanc" }, { _id: 1, spotName: 1 })
  return {
    filePath,
    spotId,
    fileName
  }
}
const path = `test/userImageUpload/image.jpg`;
const filePath = "test/userImageUpload/image.jpg";

export const newImagesToInsert = async () => await Promise.all([
  imageFactory({ filePath, fileName: "imageOne.jpg" }),
  imageFactory({ filePath, fileName: "imageTwo.jpg" }),
  imageFactory({ filePath, fileName: "imageThree.jpg" })
]);