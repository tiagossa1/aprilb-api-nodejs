import type { TripType as TripTypeModel } from "@prisma/client";
import type { TripType } from "../models/trip-type.js";

const memberToDto = (tripType: TripTypeModel) => {
  if (!tripType) {
    return <TripType>{};
  }

  return <TripType>{
    code: tripType.code,
    createdAt: tripType.createdAt,
    name: tripType.name,
    updatedAt: tripType.updateAt,
  };
};

export { memberToDto };
