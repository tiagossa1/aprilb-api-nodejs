import type { Contact } from "./contact.js";
import type { NonMemberTrip } from "./non-member-trip.js";

export interface NonMember {
  id: number;
  name: string;
  contact: Contact;
  nonMemberTrips: NonMemberTrip[];
  createdAt: Date;
  updatedAt: Date;
}
