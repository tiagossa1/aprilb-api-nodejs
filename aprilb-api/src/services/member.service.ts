import {
  Contact,
  Fee,
  Member as MemberModel,
  MemberTrip,
  PrismaClient,
  Trip,
  TripType,
} from "@prisma/client";
import _ from "lodash";
import BaseResponse from "../models/response/response.js";
import type { Member } from "../models/member.js";
import type CreateMemberRequest from "../models/request/member/create-member.js";
import type UpdateMemberRequest from "../models/request/member/update-member.js";
import logger from "../configs/logger.js";
import * as memberMapper from "../mappers/member.js";
import { isMemberFeesOnSchedule } from "../utils/member-utils.js";
import type GetMemberRequest from "../models/request/member/get-member.js";
import type GetByIdMemberRequest from "../models/request/member/get-by-id-member.js";
import type DeleteMemberRequest from "../models/request/member/delete-member.js";

const prisma = new PrismaClient();

// TODO: Recheck this. Looks weird.
const get = async (getMemberRequest: GetMemberRequest) => {
  logger.info(
    "Received a request to get all members with parameters %O.",
    getMemberRequest
  );

  const members = await prisma.member.findMany({
    include: {
      contact: {
        select: {
          landline_number: true,
          address: true,
          email: true,
          number: true,
        },
      },
      memberTrip: {
        select: {
          tripId: true,
        },
      },
      fee: {
        select: {
          year: true,
        },
      },
    },
    where: getMemberRequest?.filters?.text
      ? {
          name: {
            contains: getMemberRequest?.filters?.text,
            mode: "insensitive",
          },
        }
      : {},
    skip: getMemberRequest.skip,
    take: getMemberRequest.take,
  });

  const membersDto = members.map((m) =>
    memberMapper.modelToDto(
      m,
      <Contact>{
        address: m.contact.address,
        email: m.contact.email,
        landline_number: m.contact.landline_number,
        number: m.contact.number,
      },
      null,
      null,
      isMemberFeesOnSchedule(m.fee.map((f) => f.year)),
      m.memberTrip.length
    )
  );

  const totalCount = await prisma.member.count({
    where: getMemberRequest?.filters?.text
      ? {
          name: {
            contains: getMemberRequest?.filters?.text,
            mode: "insensitive",
          },
        }
      : {},
  });

  return new BaseResponse<{ totalCount: number; members: Member[] }>({
    data: {
      totalCount: totalCount,
      members: membersDto,
    },
  });
};

const getById = async (request: GetByIdMemberRequest) => {
  logger.info("Received a request to get member with id %d.", request.id);

  const member = await prisma.member.findFirst({
    where: {
      id: request.id,
    },
    include: {
      fee: {
        select: {
          id: true,
          year: true,
          paidAmount: true,
        },
        orderBy: {
          year: "asc",
        },
      },
      contact: {
        select: {
          address: true,
          number: true,
          landline_number: true,
          email: true,
        },
      },
      memberTrip: {
        select: {
          reservedSeats: true,
          paidAmount: true,
          trip: {
            select: {
              id: true,
              name: true,
              tripType: true,
              date: true,
            },
          },
        },
      },
    },
  });

  const paidYears = _(member?.fee)
    .map((f) => f.year)
    .value();

  return new BaseResponse<Member>({
    data: memberMapper.modelToDto(
      <MemberModel>{
        contactId: member?.contactId,
        createdAt: member?.createdAt,
        id: member?.id,
        name: member?.name,
        updatedAt: member?.updatedAt,
      },
      <Contact>{
        address: member?.contact.address,
        email: member?.contact.email,
        landline_number: member?.contact.landline_number,
        number: member?.contact.number,
      },
      member?.fee.map(
        (f) =>
          <Fee>{
            id: f.id,
            paidAmount: f.paidAmount,
            year: f.year,
          }
      ),
      member?.memberTrip.map(
        (mt) =>
          <
            MemberTrip & {
              trip: Trip & {
                tripType: TripType;
              };
            }
          >{
            paidAmount: mt.paidAmount,
            reservedSeats: mt.reservedSeats,
            trip: mt.trip,
          }
      ),
      isMemberFeesOnSchedule(paidYears),
      member?.memberTrip.length
    ),
  });
};

const getNewMembersByYearForDashboard = async () => {
  logger.info("Received a request to get new members by year.");

  const currentYear = new Date().getUTCFullYear();

  const members = await prisma.member.findMany({
    where: {
      createdAt: {
        gte: new Date((currentYear - 2).toString()),
        lte: new Date((currentYear + 1).toString()),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const membersGroupedByCreatedAtYear = _(members)
    .countBy((member) => member.createdAt.getUTCFullYear())
    .value();

  return new BaseResponse<_.Dictionary<number>>({
    data: membersGroupedByCreatedAtYear,
  });
};

const getBasicInfo = async () => {
  logger.info("Received a request to get all members' basic info.");

  const members = await prisma.member.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  const dto = _(members)
    .map((member) => {
      return {
        id: member.id,
        name: member.name,
      } as Member;
    })
    .value();

  const response = new BaseResponse<Member[]>({
    data: dto,
  });

  return response;
};

const create = async (request: CreateMemberRequest) => {
  logger.info(
    "Received a request to create a member with parameters %O.",
    request
  );

  let idToUse!: number;

  if (!request.id) {
    const lastMemberRecord = await prisma.member.aggregate({
      _max: {
        id: true,
      },
    });

    if (lastMemberRecord?._max?.id) {
      idToUse = lastMemberRecord._max.id + 1;
    }
  } else {
    idToUse = request.id;
  }

  const member = await prisma.member.create({
    data: {
      id: idToUse,
      name: request.name ?? "",
      contact: {
        create: {
          address: request.address ?? "",
          number: request.number ?? "",
          landline_number: request.landline_number ?? "",
          email: request.email ?? "",
        },
      },
    },
    include: {
      contact: true,
    },
  });

  const response = new BaseResponse<Member>({
    data: memberMapper.modelToDto(member, member.contact),
  });

  return response;
};

const update = async (request: UpdateMemberRequest) => {
  logger.info(
    "Received a request to update a member with parameters %O.",
    request
  );

  const contact = await prisma.contact.findFirst({
    where: {
      member: {
        id: request.id,
      },
    },
    select: {
      id: true,
    },
  });

  const member = await prisma.member.update({
    where: { id: request.id },
    data: {
      name: request.name,
      contact: contact
        ? {
            update: {
              id: contact?.id,
              email: request.email ?? undefined,
              landline_number: request.landline_number ?? undefined,
              number: request.number ?? undefined,
              address: request.address ?? undefined,
            },
          }
        : {},
    },
    include: {
      contact: true,
    },
  });

  const response = new BaseResponse<Member>({
    data: memberMapper.modelToDto(member, member.contact),
  });

  return response;
};

const remove = async (request: DeleteMemberRequest) => {
  try {
    logger.info("Received a request to delete member with id %d.", request.id);

    const member = await prisma.member.findFirst({
      where: {
        id: request.id,
      },
    });

    if (!member) {
      logger.warn("Could not delete member %d: does not exists.", request.id);

      return new BaseResponse({
        errors: ["Could not delete member."],
        statusCode: 404,
      });
    }

    const transactionResult = await prisma.$transaction([
      prisma.memberTrip.deleteMany({
        where: {
          memberId: request.id,
        },
      }),
      prisma.fee.deleteMany({
        where: {
          memberId: request.id,
        },
      }),
      prisma.member.delete({
        where: {
          id: request.id,
        },
      }),
      prisma.contact.delete({
        where: {
          id: member.contactId,
        },
      }),
    ]);

    if (transactionResult[0]?.count > 0) {
      logger.debug(
        `Deleted ${transactionResult[0].count} member trip records.`
      );
    }

    if (transactionResult[1]?.count > 0) {
      logger.debug(`Deleted ${transactionResult[1].count} fee records.`);
    }

    logger.info(`Successfully deleted member %d.`, request.id);

    return new BaseResponse({ success: true });
  } catch (error) {
    logger.error(`Error deleting member: ${error}.`);
    return new BaseResponse({ success: false, statusCode: 500 });
  }
};

export {
  get,
  getById,
  getNewMembersByYearForDashboard,
  getBasicInfo,
  create,
  update,
  remove,
};
