import type {
  Contact as ContactModel,
  Fee as FeeModel,
  Member as MemberModel,
  MemberTrip as MemberTripModel,
  Trip as TripModel,
  TripType as TripTypeModel,
} from "@prisma/client";
import type { Member } from "../models/member.js";
import * as contactMapper from "../mappers/contact.js";
import * as feeMapper from "../mappers/fee.js";
import * as memberTripsMapper from "../mappers/member-trip.js";
import { hidePropertyAndLog } from "../utils/object-utils.js";
import { PROPERTY_NAMES } from "../utils/constants.js";

const modelToDto = (
  member: MemberModel,
  contact: Nullable<ContactModel> = null,
  fees: Nullable<FeeModel[]> = null,
  memberTrips: Nullable<
    (MemberTripModel & {
      trip: Nullable<
        TripModel & {
          tripType: TripTypeModel;
        }
      >;
    })[]
  > = null,
  feesOnSchedule: Nullable<boolean> = null,
  tripCount: Nullable<number> = null
) => {
  if (!member) {
    return <Member>{};
  }

  const dtoMember = <Member>{
    id: member.id,
    contact: contact && contactMapper.modelToDto(contact),
    feesOnSchedule: feesOnSchedule ?? false,
    name: member.name,
    tripCount: tripCount ?? 0,
    createdAt: member.createdAt,
    updatedAt: member.updatedAt,
    fees: fees?.map((f) =>
      feeMapper.modelToDto(f, member, contact, feesOnSchedule)
    ),
    memberTrips: memberTrips?.map((mt) =>
      memberTripsMapper.modelToDto(
        mt,
        member,
        contact,
        mt.trip,
        mt.trip?.tripType
      )
    ),
  };

  const hideContact = !contact;
  const hideFees = fees?.length === 0;
  const hideMemberTrips = memberTrips?.length === 0;
  const hideFeesOnSchedule =
    feesOnSchedule === null || feesOnSchedule === undefined;
  const hideTripCount = tripCount === null || tripCount < 0;

  hideProperties(
    dtoMember,
    hideContact,
    hideFees,
    hideMemberTrips,
    hideFeesOnSchedule,
    hideTripCount
  );

  return dtoMember;
};

const hideProperties = (
  dtoMember: Member,
  hideContact: boolean,
  hideFees: boolean,
  hideMemberTrips: boolean,
  hideFeesOnSchedule: boolean,
  hideTripCount: boolean
) => {
  if (hideContact) {
    hidePropertyAndLog(dtoMember, PROPERTY_NAMES.CONTACT);
  }

  if (hideFees) {
    hidePropertyAndLog(dtoMember, PROPERTY_NAMES.FEES);
  }

  if (hideMemberTrips) {
    hidePropertyAndLog(dtoMember, PROPERTY_NAMES.MEMBER_TRIPS);
  }

  if (hideFeesOnSchedule) {
    hidePropertyAndLog(dtoMember, PROPERTY_NAMES.FEES_ON_SCHEDULE);
  }

  if (hideTripCount) {
    hidePropertyAndLog(dtoMember, PROPERTY_NAMES.TRIP_COUNT);
  }
};

export { modelToDto };
