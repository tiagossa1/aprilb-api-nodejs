import type {
  Contact as ContactModel,
  Member as MemberModel,
  MemberTrip as MemberTripModel,
  Trip as TripModel,
  TripType as TripTypeModel,
} from "@prisma/client";
import type { MemberTrip } from "../models/member-trip.js";
import { PROPERTY_NAMES } from "../utils/constants.js";
import { hidePropertyAndLog } from "../utils/object-utils.js";
import * as memberMapper from "./member.js";
import * as tripMapper from "./trip.js";

const modelToDto = (
  memberTrip: MemberTripModel,
  member: MemberModel,
  contact: Nullable<ContactModel> = null,
  trip: Nullable<TripModel> = null,
  tripType: Nullable<TripTypeModel> = null
): MemberTrip => {
  if (!memberTrip) {
    return <MemberTrip>{};
  }

  const dtoMemberTrip = <MemberTrip>{
    createdAt: memberTrip.createdAt,
    paidAmount: Number(memberTrip.paidAmount),
    reservedSeats: memberTrip.reservedSeats,
    updatedAt: memberTrip.updatedAt,
    member: memberMapper.modelToDto(member, contact),
    trip:
      trip && tripType
        ? tripMapper.modelToDto(trip, tripType, null, null)
        : null,
  };

  const hideContact = !contact;
  const hideTrip = !trip;
  const hideTripType = !tripType;

  hideProperties(dtoMemberTrip, hideContact, hideTrip, hideTripType);

  return dtoMemberTrip;
};

const hideProperties = (
  dtoMemberTrip: MemberTrip,
  hideContact: boolean,
  hideTrip: boolean,
  hideTripType: boolean
) => {
  if (hideContact) {
    hidePropertyAndLog(dtoMemberTrip, PROPERTY_NAMES.CONTACT);
  }

  if (hideTrip) {
    hidePropertyAndLog(dtoMemberTrip, PROPERTY_NAMES.TRIP);
  }

  if (hideTripType) {
    hidePropertyAndLog(dtoMemberTrip, PROPERTY_NAMES.TRIP_TYPE);
  }
};

export { modelToDto };
