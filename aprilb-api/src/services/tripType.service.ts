import { PrismaClient } from "@prisma/client";
import type CreateTripTypeRequest from "../models/request/trip-type/create-trip-type.js";
import type UpdateTripTypeRequest from "../models/request/trip-type/update-trip-type.js";
import BaseResponse from "../models/response/response.js";
import logger from "../configs/logger.js";
import * as tripTypeMapper from "../mappers/trip-type.js";
import type { TripType } from "../models/trip-type.js";
import type DeleteTripTypeRequest from "../models/request/trip-type/delete-trip-type.js";

const prisma = new PrismaClient();

const get = async () => {
  logger.info("Received a request to get all trip types.");

  const tripTypes = await prisma.tripType.findMany();

  return new BaseResponse<TripType[]>({
    data: tripTypes.map((tt) => tripTypeMapper.memberToDto(tt)),
  });
};

const create = async (request: CreateTripTypeRequest) => {
  logger.info(
    "Received a request to create trip type with parameters %O.",
    request
  );

  const tripType = await prisma.tripType.create({
    data: {
      code: request.code,
      name: request.name,
    },
  });

  return new BaseResponse<TripType>({
    data: tripTypeMapper.memberToDto(tripType),
  });
};

const update = async (request: UpdateTripTypeRequest) => {
  logger.info(
    "Received a request to update trip type with parameters %O.",
    request
  );

  const tripType = await prisma.tripType.update({
    where: {
      code: request.code,
    },
    data: {
      name: request.name,
    },
  });

  return new BaseResponse<TripType>({
    data: tripTypeMapper.memberToDto(tripType),
  });
};

const remove = async (request: DeleteTripTypeRequest) => {
  try {
    logger.info(
      "Received a request to remove trip type with code %o.",
      request
    );

    const transactionResult = await prisma.$transaction([
      prisma.trip.deleteMany({
        where: {
          tripTypeCode: request.code,
        },
      }),
      prisma.tripType.delete({
        where: {
          code: request.code,
        },
      }),
    ]);

    if (transactionResult[0]?.count > 0) {
      logger.debug(`Deleted ${transactionResult[0].count} trips.`);
    }

    logger.info(`Successfully deleted trip type ${request.code}.`);

    return new BaseResponse({ success: true });
  } catch (error) {
    logger.error(`Error deleting trip type: ${error}.`);
    return new BaseResponse({ success: false, statusCode: 500 });
  }
};

export { get, create, update, remove };
