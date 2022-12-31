import {
  Contact,
  Member,
  MemberTrip,
  NonMember,
  NonMemberTrip,
  PrismaClient,
  Trip as TripModel,
  TripType as TripTypeModel,
} from "@prisma/client";
import _ from "lodash";
import type UpdateTripRequest from "../models/request/trip/update-trip.js";
import BaseResponse from "../models/response/response.js";
import type CreateTripRequest from "../models/request/trip/create-trip.js";
import logger from "../configs/logger.js";
// import RedisWrapper from "../wrappers/redis.wrapper.js";
import { getTotalPaidAmount, sumSeats } from "../utils/trip-utils.js";
import * as tripMapper from "../mappers/trip.js";
import type { Trip } from "../models/trip.js";
import type GetTripRequest from "../models/request/trip/get-trip.js";
import type LastTripRequest from "../models/request/trip/last-trip.js";

const prisma = new PrismaClient();
// const redisClient = await RedisWrapper.getClient();

const get = async (request: GetTripRequest) => {
  logger.info(
    "Received a request to get all trips with parameters %0.",
    request
  );

  const whereObj: any = {
    date:
      request?.filters?.dateStart && request?.filters?.dateEnd
        ? {
            gte: request?.filters.dateStart,
            lte: request?.filters.dateEnd,
          }
        : {},
    tripTypeCode: request?.filters.tripTypeCode
      ? {
          equals: request?.filters.tripTypeCode,
        }
      : {},
    name: request?.filters.text
      ? {
          contains: request?.filters.text,
          mode: "insensitive",
        }
      : {},
  };

  const trips = await prisma.trip.findMany({
    include: {
      tripType: {
        select: {
          code: true,
          name: true,
        },
      },
      memberTrip: {
        include: {
          member: true,
        },
      },
      nonMemberTrip: {
        include: {
          nonMember: true,
        },
      },
    },
    where: whereObj,
    skip: request.skip,
    take: request.take,
    orderBy: {
      name: "asc",
    },
  });

  const totalCount = await prisma.trip.count({
    where: whereObj,
  });

  let dtoTrips = trips.map((t) =>
    tripMapper.modelToDto(
      t,
      <TripTypeModel>t.tripType,
      <
        (MemberTrip & {
          member: Member & {
            contact: null;
          };
        })[]
      >t.memberTrip,
      <
        (NonMemberTrip & {
          nonMember: NonMember & {
            contact: null;
          };
        })[]
      >t.nonMemberTrip
    )
  );

  return new BaseResponse<{
    trips: Trip[];
    totalCount: number;
  }>({
    data: {
      trips: dtoTrips,
      totalCount: totalCount,
    },
  });
};

const getLastTrips = async (request: LastTripRequest) => {
  logger.info(
    "Received a request to get last trips with parameter take %o.",
    request
  );

  const trips = await prisma.trip.findMany({
    include: {
      tripType: true,
    },
    orderBy: {
      date: "desc",
    },
    take: request.take,
  });

  const dtoTrips = _(trips)
    .map((t) => tripMapper.modelToDto(t, t.tripType))
    .value();

  return new BaseResponse<Trip[]>({ data: dtoTrips });
};

const getTripsForDashboard = async () => {
  // const CACHE_KEY = "GET_TRIPS_FOR_DASHBOARD_KEY";
  logger.info("Received a request to get trips for dashboard.");

  // const resultCached = await redisClient.get(CACHE_KEY);

  // if (resultCached) {
  //   return new BaseResponse<
  //     {
  //       name: string;
  //       date: Date;
  //       totalPaidAmount: number;
  //     }[]
  //   >({
  //     data: JSON.parse(resultCached),
  //   });
  // }

  const trips = await prisma.trip.findMany({
    where: {
      date: {
        lte: new Date(),
      },
    },
    include: {
      memberTrip: {
        select: {
          paidAmount: true,
        },
      },
      nonMemberTrip: {
        select: {
          paidAmount: true,
        },
      },
      tripType: true,
    },
    orderBy: {
      date: "asc",
    },
    take: 20,
  });

  const tripsForDashboard = _(trips)
    .map((trip) => ({
      name: trip.name,
      date: trip.date,
      totalPaidAmount: getTotalPaidAmount(
        _(trip.memberTrip)
          .map((mt) => Number(mt.paidAmount))
          .value(),
        _(trip.nonMemberTrip)
          .map((nm) => Number(nm.paidAmount))
          .value()
      ),
    }))
    .value();

  // await redisClient.set(CACHE_KEY, JSON.stringify(tripsForDashboard), {
  //   EX: 604800, // 7 days
  //   NX: true,
  // });

  return new BaseResponse<
    {
      name: string;
      date: Date;
      totalPaidAmount: number;
    }[]
  >({
    data: tripsForDashboard,
  });
};

const create = async (request: CreateTripRequest) => {
  logger.info(
    "Received a request to create a trip with parameters: %O.",
    request
  );

  try {
    const trip = await prisma.trip.create({
      data: {
        name: request.name,
        tripTypeCode: request.tripTypeCode,
        destination: request.destination,
        description: request.description,
        totalSeats: request.totalSeats,
        date: request.date,
        memberTrip:
          request.memberTrip?.length > 0
            ? {
                createMany: {
                  data: request.memberTrip,
                },
              }
            : {},
        nonMemberTrip:
          request.nonMemberTrip?.length > 0
            ? {
                createMany: {
                  data: request.nonMemberTrip,
                },
              }
            : {},
      },
      include: {
        tripType: true,
        memberTrip: {
          include: {
            member: true,
          },
        },
        nonMemberTrip: {
          include: {
            nonMember: true,
          },
        },
      },
    });

    const dtoTrip = tripMapper.modelToDto(
      trip,
      trip.tripType,
      <
        (MemberTrip & {
          member: Member & {
            contact: Nullable<Contact>;
          };
        })[]
      >trip.memberTrip,
      <
        (NonMemberTrip & {
          nonMember: NonMember & {
            contact: Nullable<Contact>;
          };
        })[]
      >trip.nonMemberTrip
    );

    return new BaseResponse<Trip>({ data: dtoTrip });
  } catch (error) {
    logger.error("An error occurred while creating a trip.", error);

    return new BaseResponse<null>({});
  }
};

const update = async (request: UpdateTripRequest) => {
  logger.info(
    "Received a request to update a trip with parameters: %O.",
    request
  );

  const prismaTransactions = [];

  prismaTransactions.push(
    prisma.trip.update({
      where: {
        id: request.id,
      },
      data: {
        name: request?.name ?? undefined,
        tripTypeCode: request?.tripTypeCode ?? undefined,
        destination: request?.destination ?? undefined,
        description: request?.description ?? undefined,
        totalSeats: request?.totalSeats ?? undefined,
        date: new Date(request?.date),
      },
    })
  );

  const tripTotalSeats = await prisma.trip.findFirst({
    where: {
      id: request.id,
    },
    select: {
      totalSeats: true,
    },
  });

  const totalSeats = tripTotalSeats?.totalSeats ?? 0;

  if (totalSeats > 0) {
    const memberTripRequestedReservedSeats = _(request.memberTrip)
      .map((mt) => mt.reservedSeats)
      .value();

    const nonMemberTripRequestedReservedSeats = _(request.nonMemberTrip)
      .map((nm) => nm.reservedSeats)
      .value();

    const totalRequestedSeats = sumSeats(
      memberTripRequestedReservedSeats,
      nonMemberTripRequestedReservedSeats
    );

    if (totalRequestedSeats > totalSeats) {
      logger.warn(
        `Could not updating trip: requested non-members/members exceeds the total seats.`
      );

      return new BaseResponse({
        errors: ["No available seats for the requested non-members/members."],
        statusCode: 400,
      });
    }
  }

  await prisma.memberTrip.deleteMany({
    where: {
      tripId: request.id,
    },
  });

  await prisma.nonMemberTrip.deleteMany({
    where: {
      tripId: request.id,
    },
  });

  if (request?.memberTrip?.length > 0) {
    request.memberTrip.forEach((memberTrip) => {
      prismaTransactions.push(
        prisma.trip.update({
          where: {
            id: request.id,
          },
          data: {
            memberTrip: {
              create: {
                paidAmount: memberTrip.paidAmount,
                reservedSeats: memberTrip.reservedSeats,
                memberId: memberTrip.memberId,
              },
            },
          },
        })
      );
    });
  }

  if (request.nonMemberTrip?.length > 0) {
    request.nonMemberTrip.forEach((nonMemberTrip) => {
      prismaTransactions.push(
        prisma.trip.update({
          where: {
            id: request.id,
          },
          data: {
            nonMemberTrip: {
              create: {
                paidAmount: nonMemberTrip.paidAmount,
                reservedSeats: nonMemberTrip.reservedSeats,
                nonMemberId: nonMemberTrip.nonMemberId,
              },
            },
          },
        })
      );
    });
  }

  await prisma.$transaction(prismaTransactions);

  const updatedTrip = await prisma.trip.findFirst({
    where: {
      id: request.id,
    },
    include: {
      memberTrip: {
        include: {
          member: true,
        },
      },
      nonMemberTrip: {
        include: {
          nonMember: true,
        },
      },
      tripType: true,
    },
  });

  let dtoTrip = tripMapper.modelToDto(
    <
      TripModel & {
        tripType: TripTypeModel;
        memberTrip: (MemberTrip & {
          member: Member;
        })[];
        nonMemberTrip: (NonMemberTrip & {
          nonMember: NonMember;
        })[];
      }
    >updatedTrip,
    <TripTypeModel>updatedTrip?.tripType,
    <
      (MemberTrip & {
        member: Member & {
          contact: Nullable<Contact>;
        };
      })[]
    >updatedTrip?.memberTrip,
    <
      (NonMemberTrip & {
        nonMember: NonMember & {
          contact: Nullable<Contact>;
        };
      })[]
    >updatedTrip?.nonMemberTrip
  );

  return new BaseResponse<Trip>({
    data: dtoTrip,
  });
};

const remove = async (id: number) => {
  logger.info("Received a request to delete a trip with id %d.", id);

  const [memberTripsDelete, nonMemberTripsDelete] = await prisma.$transaction([
    prisma.memberTrip.deleteMany({
      where: {
        tripId: id,
      },
    }),
    prisma.nonMemberTrip.deleteMany({
      where: {
        tripId: id,
      },
    }),
    prisma.trip.delete({
      where: {
        id,
      },
    }),
  ]);

  if (memberTripsDelete?.count > 0) {
    logger.debug(`Deleted ${memberTripsDelete.count} member trips.`);
  }

  if (nonMemberTripsDelete?.count > 0) {
    logger.debug(`Deleted ${nonMemberTripsDelete.count} non member trips.`);
  }

  return new BaseResponse({ success: true });
};

export { get, getLastTrips, getTripsForDashboard, create, update, remove };
