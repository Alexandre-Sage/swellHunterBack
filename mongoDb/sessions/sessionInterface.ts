import { Types } from "mongoose";
import { GeoJsonObject } from "../generalInterface/geoJsonInterface";
import { SwellObject } from "../generalInterface/swellInterface";
import { WindObject } from "../generalInterface/windInterface";

export interface SessionInterface {
    _id: Types.ObjectId;
    userId?: Types.ObjectId;
    spotName?: String;
    spotId?: Types.ObjectId;
    location: GeoJsonObject;
    date: Date;
    startTime: Date;
    endTime: Date;
    totalTime: Date;
    swell: SwellObject;
    wind: WindObject;
    comment: String;
};
