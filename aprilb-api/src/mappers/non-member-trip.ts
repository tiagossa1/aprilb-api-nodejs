import type {
  Contact as ContactModel,
  NonMember as NonMemberModel,
  NonMemberTrip as NonMemberTripModel,
  Trip as TripModel,
  TripType as TripTypeModel,
} from "@prisma/client";
import type { NonMemberTrip } from "../models/non-member-trip.js";
import { PROPERTY_NAMES } from "../utils/constants.js";
import { hidePropertyAndLog } from "../utils/object-utils.js";
import * as nonMemberMapper from "./non-member.js";
import * as tripMapper from "./trip.js";

const modelToDto = (
  nonMemberTrip: NonMemberTripModel,
  nonMember: NonMemberModel,
  contact: Nullable<ContactModel> = null,
  trip: Nullable<TripModel> = null,
  tripType: Nullable<TripTypeModel> = null
): NonMemberTrip => {
  if (!nonMemberTrip) {
    return <NonMemberTrip>{};
  }

  let dtoNonMemberTrip = <NonMemberTrip>{
    createdAt: nonMemberTrip.createdAt,
    paidAmount: Number(nonMemberTrip.paidAmount),
    reservedSeats: nonMemberTrip.reservedSeats,
    updatedAt: nonMemberTrip.updatedAt,
    nonMember: nonMemberMapper.modelToDto(nonMember, contact),
    trip: trip && tripType ? tripMapper.modelToDto(trip, tripType) : null,
  };

  const hideTrip = !trip;
  const hideTripType = !tripType;

  hideProperties(dtoNonMemberTrip, hideTrip, hideTripType);

  return dtoNonMemberTrip;
};

const hideProperties = (
  dtoNonMemberTrip: NonMemberTrip,
  hideTrip: boolean,
  hideTripType: boolean
) => {
  if (hideTrip) {
    hidePropertyAndLog(dtoNonMemberTrip, PROPERTY_NAMES.TRIP);
  }

  if (hideTripType) {
    hidePropertyAndLog(dtoNonMemberTrip, PROPERTY_NAMES.TRIP_TYPE);
  }
};

export { modelToDto };
