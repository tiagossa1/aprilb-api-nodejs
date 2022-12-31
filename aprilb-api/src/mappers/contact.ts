import type { Contact as ContactModel } from "@prisma/client";
import type { Contact } from "../models/contact.js";

const modelToDto = (contact: ContactModel) => {
  if (!contact) {
    return <Contact>{};
  }

  return <Contact>{
    id: contact.id,
    address: contact.address,
    createdAt: contact.createdAt,
    updatedAt: contact.updatedAt,
    email: contact.email,
    landline_number: contact.landline_number,
    number: contact.number,
  };
};

export { modelToDto };
