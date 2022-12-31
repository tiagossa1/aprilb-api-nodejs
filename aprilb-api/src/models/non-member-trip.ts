import type { NonMember } from "./non-member.js";
import type { Trip } from "./trip.js";

export interface NonMemberTrip {
  reservedSeats: number;
  paidAmount: number;
  trip: Trip;
  nonMember: NonMember;
  createdAt: Date;
  updatedAt: Date;
}
