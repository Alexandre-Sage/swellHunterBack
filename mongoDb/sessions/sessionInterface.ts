import { Types } from "mongoose";
import { SwellObject } from "../generalInterface/swellInterface";
import { WindObject } from "../generalInterface/windInterface";

export interface SessionInterface {
    _id: Types.ObjectId
    userId: String,
    date: Date,
    spotId: String,
    startTime: Date,
    endTime: Date,
    totalTime: Date,
    swell: SwellObject,
    wind: WindObject,
    comment: String
};
