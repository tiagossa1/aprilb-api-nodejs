import { PrismaClient } from "@prisma/client";
import type CreateNonMemberRequest from "../models/request/non-member/create-non-member.js";
import type UpdateNonMemberRequest from "../models/request/non-member/update-non-member.js";
import BaseResponse from "../models/response/response.js";
import logger from "../configs/logger.js";

import * as nonMemberMapper from "../mappers/non-member.js";
import type { NonMember } from "../models/non-member.js";
import type GetNonMemberRequest from "../models/request/non-member/get-non-member.js";
import type DeleteNonMemberRequest from "../models/request/non-member/delete-non-member.js";

const prisma = new PrismaClient();

const get = async (request: GetNonMemberRequest) => {
  logger.info("Received a request to get non members with parameters %O.", {
    skip: request.skip,
    take: request.take,
  });

  const whereObj: any = request?.filters?.text
    ? {
        name: {
          contains: request?.filters?.text,
          mode: "insensitive",
        },
      }
    : {};

  const nonMembers = await prisma.nonMember.findMany({
    include: {
      contact: true,
    },
    skip: request?.skip,
    take: request?.take,
    where: whereObj,
    orderBy: {
      name: "asc",
    },
  });

  const totalCount = await prisma.nonMember.count({
    where: whereObj,
  });

  return new BaseResponse<{
    nonMembers: NonMember[];
    totalCount: number;
  }>({
    data: {
      nonMembers: nonMembers.map((nm) =>
        nonMemberMapper.modelToDto(nm, nm.contact)
      ),
      totalCount: totalCount,
    },
  });
};

const getBasicInfo = async () => {
  logger.info("Received a request to get non members' basic info.");

  const nonMembers = await prisma.nonMember.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return new BaseResponse<
    {
      id: number;
      name: string;
    }[]
  >({
    data: nonMembers,
  });
};

const create = async (request: CreateNonMemberRequest) => {
  logger.info(
    "Received a request to create non members with parameters %O.",
    request
  );

  const nonMember = await prisma.nonMember.create({
    data: {
      name: request.name,
      contact: {
        create: {
          address: request.address,
          number: request.number,
          landline_number: request.landline_number,
          email: request.email,
        },
      },
    },
    include: {
      contact: true,
    },
  });

  return new BaseResponse<NonMember>({
    data: nonMemberMapper.modelToDto(nonMember, nonMember.contact),
  });
};

const update = async (request: UpdateNonMemberRequest) => {
  logger.info(
    "Received a request to update non member with parameters %O.",
    request
  );

  const contact = await prisma.contact.findFirst({
    where: {
      nonMember: {
        id: request.id,
      },
    },
    select: {
      id: true,
    },
  });

  const nonMember = await prisma.nonMember.update({
    where: { id: request.id },
    data: {
      name: request.name,
      contact: contact
        ? {
            update: {
              id: contact?.id,
              address: request.address,
              email: request.email,
              landline_number: request.landline_number,
              number: request.number,
            },
          }
        : {},
    },
    include: {
      contact: true,
    },
  });

  return new BaseResponse<NonMember>({
    data: nonMemberMapper.modelToDto(nonMember, nonMember.contact),
  });
};

const remove = async (request: DeleteNonMemberRequest) => {
  try {
    logger.info(
      "Received a request to delete non member with id %d.",
      request.id
    );

    const [nonMemberTripDelete] = await prisma.$transaction([
      prisma.nonMemberTrip.deleteMany({
        where: {
          nonMemberId: request.id,
        },
      }),
      prisma.nonMember.delete({
        where: { id: request.id },
      }),
    ]);

    if (nonMemberTripDelete?.count > 0) {
      logger.debug(`Deleted ${nonMemberTripDelete.count} non member trips.`);
    }

    return new BaseResponse({ success: true });
  } catch (error) {
    logger.error(`Error deleting non member: ${error}.`);
    return new BaseResponse({ success: false, statusCode: 500 });
  }
};

export { get, getBasicInfo, create, update, remove };
