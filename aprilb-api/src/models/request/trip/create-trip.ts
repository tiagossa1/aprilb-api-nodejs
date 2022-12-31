import type CreateMemberTripRequest from "../member-trip/create-member-trip.js";
import type CreateNonMemberTripRequest from "../non-member-trip/create-non-member-trip.js";

interface CreateTripRequest {
  name: string;
  tripTypeCode: string;
  destination: string;
  description: string;
  totalSeats: number;
  date: Date;
  memberTrip: CreateMemberTripRequest[];
  nonMemberTrip: CreateNonMemberTripRequest[];
}

export default CreateTripRequest;
