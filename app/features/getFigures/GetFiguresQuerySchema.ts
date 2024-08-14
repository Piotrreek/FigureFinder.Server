import { number, object } from "yup";
import { FormSchema } from "../../../utils/FormSchema";
import { GetFiguresQuery } from "./GetFiguresQuery";

export const GetFiguresQuerySchema = object().shape<
  FormSchema<GetFiguresQuery>
>({
  figureTypeId: number().optional().integer(),
  figureStatusId: number().optional().integer(),
  latitude: number()
    .optional()
    .test(
      "latitude-required-if-longitude",
      "Latitude is required when longitude is provided",
      function (value) {
        const { longitude } = this.parent;
        if (longitude !== undefined && value === undefined) {
          return false;
        }
        return true;
      }
    ),
  longitude: number()
    .optional()
    .test(
      "longitude-required-if-latitude",
      "Longitude is required when latitude is provided",
      function (value) {
        const { latitude } = this.parent;
        if (latitude !== undefined && value === undefined) {
          return false;
        }
        return true;
      }
    ),
  maxDistance: number()
    .optional()
    .test(
      "maxDistance-required-if-latlong",
      "Max distance is required when latitude and longitude are provided",
      function (value) {
        const { latitude, longitude } = this.parent;
        if (
          latitude !== undefined &&
          longitude !== undefined &&
          value === undefined
        ) {
          return false;
        }
        return true;
      }
    ),
});
