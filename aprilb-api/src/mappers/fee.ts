import type {
  Contact as ContactModel,
  Fee as FeeModel,
  Member as MemberModel,
} from "@prisma/client";
import _ from "lodash";
import type { Fee } from "../models/fee.js";
import * as memberMapper from "../mappers/member.js";
import { PROPERTY_NAMES } from "../utils/constants.js";
import { hidePropertyAndLog } from "../utils/object-utils.js";

const modelToDto = (
  fee: FeeModel,
  member: Nullable<MemberModel> = null,
  contact: Nullable<ContactModel> = null,
  feesOnSchedule: Nullable<boolean> = null
): Fee => {
  if (!fee) {
    return <Fee>{};
  }

  let dtoFee = <Fee>{
    id: fee.id,
    paidAmount: Number(fee.paidAmount),
    year: fee.year,
    createdAt: fee.createdAt,
    updatedAt: fee.updatedAt,
    feesOnSchedule: feesOnSchedule ?? false,
    member: member
      ? memberMapper.modelToDto(member, contact, null, null, feesOnSchedule)
      : null,
  };

  const hideMember = !member;
  const hideFeesOnSchedule =
    feesOnSchedule === null || feesOnSchedule === undefined;

  hideProperties(dtoFee, hideMember, hideFeesOnSchedule);

  return dtoFee;
};

const hideProperties = (
  dtoFee: Fee,
  hideMember: boolean,
  hideFeesOnSchedule: boolean
) => {
  if (hideMember) {
    hidePropertyAndLog(dtoFee, PROPERTY_NAMES.MEMBER);
  }

  if (hideFeesOnSchedule) {
    hidePropertyAndLog(dtoFee, PROPERTY_NAMES.FEES_ON_SCHEDULE);
  }
};

export { modelToDto };
