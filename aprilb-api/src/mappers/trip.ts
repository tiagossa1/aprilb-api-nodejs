import type {
  Trip as TripModel,
  TripType as TripTypeModel,
  MemberTrip as MemberTripModel,
  NonMemberTrip as NonMemberTripModel,
  Member as MemberModel,
  NonMember as NonMemberModel,
  Contact as ContactModel,
} from "@prisma/client";
import type { Trip } from "../models/trip.js";
import { PROPERTY_NAMES } from "../utils/constants.js";
import { hidePropertyAndLog } from "../utils/object-utils.js";
import * as memberTripMapper from "./member-trip.js";
import * as nonMemberTripMapper from "./non-member-trip.js";
import * as tripTypeMapper from "./trip-type.js";

const modelToDto = (
  trip: TripModel,
  tripType: TripTypeModel,
  membersTrip: Nullable<
    (MemberTripModel & {
      member: MemberModel & {
        contact: Nullable<ContactModel>;
      };
    })[]
  > = null,
  nonMembersTrip: Nullable<
    (NonMemberTripModel & {
      nonMember: NonMemberModel & {
        contact: Nullable<ContactModel>;
      };
    })[]
  > = null
) => {
  if (!trip) {
    return <Trip>{};
  }

  const dtoTrip = <Trip>{
    id: trip.id,
    date: trip.date,
    createdAt: trip.createdAt,
    destination: trip.destination,
    name: trip.name,
    totalSeats: trip.totalSeats,
    tripType: tripTypeMapper.memberToDto(tripType),
    updatedAt: trip.updatedAt,
    description: trip.description,
    tripPosterFileName: trip.tripPosterFileName,
    memberTrips: membersTrip?.map((mt) =>
      memberTripMapper.modelToDto(
        mt,
        mt.member,
        <ContactModel>mt.member.contact
      )
    ),
    nonMemberTrips: nonMembersTrip?.map((nmt) =>
      nonMemberTripMapper.modelToDto(
        nmt,
        nmt.nonMember,
        <ContactModel>nmt.nonMember.contact
      )
    ),
  };

  const hideMembersTrip = !membersTrip;
  const hideNonMembersTrip = !nonMembersTrip;

  hideProperties(dtoTrip, hideMembersTrip, hideNonMembersTrip);

  return dtoTrip;
};

const hideProperties = (
  dtoTrip: Trip,
  hideMembersTrip: boolean,
  hideNonMembersTrip: boolean
) => {
  if (hideMembersTrip) {
    hidePropertyAndLog(dtoTrip, PROPERTY_NAMES.MEMBER_TRIPS);
  }

  if (hideNonMembersTrip) {
    hidePropertyAndLog(dtoTrip, PROPERTY_NAMES.NON_MEMBER_TRIPS);
  }
};

export { modelToDto };
