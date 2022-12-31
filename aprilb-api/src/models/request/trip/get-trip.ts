import type FiltersTrip from "./trip-filters.js";

interface GetTripRequest {
    skip: number;
    take: number;
    filters: FiltersTrip;
}

export default GetTripRequest;