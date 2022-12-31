import type UpdateNonMemberTripRequest from "../non-member-trip/update-non-member-trip.js";
import type UpdateMemberTripRequest from "../member-trip/update-member-trip.js";

interface UpdateTripRequest {
  id: number;
  name: string;
  tripTypeCode: string;
  destination: string;
  description: string;
  totalSeats: number;
  date: Date;
  memberTrip: UpdateMemberTripRequest[];
  nonMemberTrip: UpdateNonMemberTripRequest[];
}

export default UpdateTripRequest;
