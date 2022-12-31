const PROPERTY_NAMES = Object.freeze({
  TRIP_COUNT: "tripCount",
  FEES_ON_SCHEDULE: "feesOnSchedule",
  MEMBER: "member",
  CONTACT: "contact",
  FEES: "fees",
  MEMBER_TRIPS: "memberTrips",
  NON_MEMBER_TRIPS: 'nonMemberTrips',
  TRIP: 'trip',
  TRIP_TYPE: 'tripType'
});

const ENVIRONMENTS = Object.freeze({
  PRODUCTION: 'production',
  DEVELOPMENT: 'development'
})

export { PROPERTY_NAMES, ENVIRONMENTS };
