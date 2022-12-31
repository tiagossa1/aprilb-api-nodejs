import Joi from "joi";
import paginationSchema from "./pagination.js";

const validIndicatives = [
  210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224,
  225, 226, 227, 228, 229, 231, 232, 233, 234, 235, 236, 238, 239, 241, 242,
  243, 244, 245, 249, 251, 252, 253, 254, 255, 256, 258, 259, 261, 262, 263,
  265, 266, 268, 269, 271, 272, 273, 274, 275, 276, 277, 278, 279, 281, 282,
  283, 284, 285, 286, 289, 291, 292, 295, 296,
];

const validPhoneNumberIndicatives = [91, 92, 93, 96];

const validateLandlinePhone = (value: string, helper: any) => {
  // Get the first three digits of the landline number.
  if (!value) return helper.message("Invalid landline phone.");

  const landlinePhoneIndicative = Number(value.substring(0, 3));

  // If the landline number indicatives are valid, the phone is valid.
  if (validIndicatives.includes(landlinePhoneIndicative)) return true;
  return helper.message("Invalid landline phone.");
};

const validatePhoneNumber = (value: string, helper: any) => {
  if (!value) return helper.message("Invalid phone number.");

  const phoneNumberIndicative = Number(value.substring(0, 2));

  if (validPhoneNumberIndicatives.includes(phoneNumberIndicative)) return true;

  return helper.message("Invalid phone phone.");
};

const getNonMembersSchema = paginationSchema.keys({
  filters: Joi.object({
    text: Joi.string()
      .trim()
      .normalize()
      .max(255)
      .allow(null)
      .empty("")
      .optional(),
  })
    .allow(null)
    .default({})
    .empty({})
    .optional(),
});

const createNonMemberSchema = Joi.object({
  address: Joi.string().trim().normalize().max(255).required(),
  number: Joi.string()
    .trim()
    .normalize()
    .length(9)
    .allow(null)
    .empty("")
    .custom(validatePhoneNumber),
  landline_number: Joi.string()
    .trim()
    .normalize()
    .length(9)
    .allow(null)
    .empty("")
    .custom(validateLandlinePhone),
  email: Joi.string()
    .trim()
    .normalize()
    .max(255)
    .trim()
    .email()
    .allow(null)
    .empty("")
    .optional(),
  name: Joi.string().trim().normalize().max(255).required(),
  skip: Joi.number().min(0).allow(null).empty("").optional(),
  take: Joi.number().positive().allow(null).empty("").optional(),
}).or("number", "landline_number");

const updateNonMemberSchema = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string()
    .trim()
    .normalize()
    .max(255)
    .allow(null)
    .empty("")
    .optional(),
  number: Joi.string()
    .trim()
    .normalize()
    .length(9)
    .custom(validatePhoneNumber)
    .allow(null)
    .empty("")
    .optional(),
  landline_number: Joi.string()
    .normalize()
    .length(9)
    .allow(null)
    .empty("")
    .custom(validateLandlinePhone)
    .optional(),
  address: Joi.string()
    .trim()
    .normalize()
    .max(255)
    .allow(null)
    .empty("")
    .optional(),
  email: Joi.string()
    .trim()
    .normalize()
    .trim()
    .max(255)
    .email()
    .allow(null)
    .empty("")
    .optional(),
});

const deleteNonMemberSchema = Joi.object({
  id: Joi.number().positive().required(),
});

export {
  validIndicatives,
  validPhoneNumberIndicatives,
  getNonMembersSchema,
  createNonMemberSchema,
  updateNonMemberSchema,
  deleteNonMemberSchema,
};
