import type {
  Contact as ContactModel,
  NonMember as NonMemberModel,
} from "@prisma/client";
import type { NonMember } from "../models/non-member.js";
import { PROPERTY_NAMES } from "../utils/constants.js";
import { hidePropertyAndLog } from "../utils/object-utils.js";
import * as contactMapper from "./contact.js";

const modelToDto = (
  nonMember: NonMemberModel,
  contact: Nullable<ContactModel>
) => {
  if (!nonMember) {
    return <NonMember>{};
  }

  let dtoNonMember = <NonMember>{
    id: nonMember.id,
    createdAt: nonMember.createdAt,
    name: nonMember.name,
    updatedAt: nonMember.updatedAt,
    contact: contact && contactMapper.modelToDto(contact),
  };

  hideProperties(dtoNonMember, !contact);

  return dtoNonMember;
};

const hideProperties = (dtoNonMember: NonMember, hideContact: boolean) => {
  if (hideContact) {
    hidePropertyAndLog(dtoNonMember, PROPERTY_NAMES.CONTACT);
  }
};

export { modelToDto };
