import type { Member } from "./member.js";
import type { Trip } from "./trip.js";

export interface MemberTrip {
  reservedSeats: number;
  paidAmount: number;
  trip: Trip;
  member: Member;
  createdAt: Date;
  updatedAt: Date;
}
