import { PrismaClient } from "@prisma/client";
import _ from "lodash";
import type { Fee } from "../models/fee.js";
import type CreateFeeRequest from "../models/request/fee/create-fee.js";
import type UpdateFeeRequest from "../models/request/fee/update-fee.js";
import BaseResponse from "../models/response/response.js";
import logger from "../configs/logger.js";
import * as feeMapper from "../mappers/fee.js";
import { isMemberFeesOnSchedule } from "../utils/member-utils.js";
import type GetFeeRequest from "../models/request/fee/get-fee.js";

const prisma = new PrismaClient();

// TODO: Think about pagination later.
const get = async (request: GetFeeRequest) => {
  logger.info(
    "Received a request to get all fees with parameters %O.",
    request
  );

  // Get all fees ordered by member name then by year.
  // If a member name filter is passed, then filter it.
  const fees = await prisma.fee.findMany({
    include: {
      member: {
        include: {
          contact: true,
        },
      },
    },
    where: request.filters?.memberName
      ? {
          member: {
            name: {
              contains: request.filters.memberName,
              mode: "insensitive",
            },
          },
        }
      : {},
    orderBy: [
      {
        member: {
          name: "asc",
        },
      },
      {
        year: "asc",
      },
    ],
  });

  let feesDto: Fee[] = _(fees)
    .map((f) => {
      const paidYears = _(fees)
        .filter((ff) => ff.member.id === f.member.id)
        .map((f) => f.year)
        .value();
      const feesOnSchedule = isMemberFeesOnSchedule(paidYears);

      return feeMapper.modelToDto(
        f,
        f.member,
        f.member.contact,
        feesOnSchedule
      );
    })
    .value();

  if (request.filters.showFeesMissingSchedule) {
    return new BaseResponse<Fee[]>({
      data: _(feesDto)
        .filter((f) => !f.feesOnSchedule)
        .value(),
      success: true,
    });
  } else if (request.filters.showFeesOnSchedule) {
    return new BaseResponse<Fee[]>({
      data: _(feesDto)
        .filter((f) => (f.feesOnSchedule ?? false) === true)
        .value(),
      success: true,
    });
  }

  return new BaseResponse<Fee[]>({
    data: feesDto,
    success: true,
  });
};

const create = async (request: CreateFeeRequest) => {
  logger.info(
    "Received a request to create a fee with parameters %O.",
    request
  );

  const countFeeForYear = await prisma.fee.count({
    where: {
      memberId: request.memberId,
      year: request.year,
    },
  });

  if (countFeeForYear > 0) {
    logger.error("Error creating a fee: User already paid for that year.");

    return new BaseResponse({
      errors: ["Error creating fee."],
      success: false,
    });
  }

  const newFee = await prisma.fee.create({
    data: {
      paidAmount: request.paidAmount,
      year: request.year,
      memberId: request.memberId,
    },
    include: {
      member: true,
    },
  });

  const userPaidYearFees = await prisma.fee.findMany({
    select: {
      year: true,
    },
    where: {
      memberId: request.memberId,
    },
  });

  const feesOnSchedule = isMemberFeesOnSchedule(
    _(userPaidYearFees)
      .map((p) => p.year)
      .value()
  );

  return new BaseResponse<Fee>({
    data: feeMapper.modelToDto(newFee, newFee.member, null, feesOnSchedule),
    success: true,
  });
};

const update = async (request: UpdateFeeRequest) => {
  logger.info(
    "Received a request to update a fee with parameters %O.",
    request
  );

  const memberForFee = await prisma.member.findFirst({
    where: {
      id: request.memberId,
    },
  });

  if (!memberForFee) {
    logger.warn("Could not find fee: member does not exists.");

    return new BaseResponse({
      errors: ["Error updating fee."],
      statusCode: 404,
    });
  }

  const fee = await prisma.fee.update({
    where: { id: request.id },
    data: {
      year: request.year,
      paidAmount: request.paidAmount,
      memberId: request.memberId,
    },
    include: {
      member: true,
    },
  });

  return new BaseResponse<Fee>({
    data: feeMapper.modelToDto(fee, fee.member),
    success: true,
  });
};

const remove = async (id: number) => {
  try {
    logger.info("Received a request to delete a fee with id %d.", id);

    await prisma.fee.delete({
      where: { id },
    });

    return new BaseResponse({ success: true });
  } catch (error) {
    logger.error(`Error deleting fee: ${error}.`);
    return new BaseResponse({ success: false });
  }
};

export { get, create, update, remove };
