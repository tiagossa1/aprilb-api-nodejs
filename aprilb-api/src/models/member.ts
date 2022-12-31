import type { Contact } from "./contact.js";
import type { Fee } from "./fee.js";
import type { MemberTrip } from "./member-trip.js";

export interface Member {
  id: number;
  name: string;
  contact: Contact;
  fees?: Fee[];
  memberTrips?: MemberTrip[];
  tripCount: number;
  feesOnSchedule: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
