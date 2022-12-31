import type { MemberTrip } from "./member-trip.js";
import type { NonMemberTrip } from "./non-member-trip.js";
import type { TripType } from "./trip-type.js";

export interface Trip {
  id: number;
  name: string;
  tripType: TripType;
  tripPosterFileName?: string;
  destination: string;
  description?: string;
  totalSeats: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  memberTrips?: MemberTrip[];
  nonMemberTrips?: NonMemberTrip[];
}
