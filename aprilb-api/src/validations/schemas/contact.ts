import Joi from "joi";

const createContactSchema = Joi.object({
  address: Joi.string().trim().normalize().max(255).required(),
  number: Joi.string()
    .trim()
    .normalize()
    .length(9)
    .pattern(/^[0-9]+$/),
  landline_number: Joi.string()
    .trim()
    .normalize()
    .length(9)
    .pattern(/^[0-9]+$/)
    .when("number", {
      is: Joi.not().exist(),
      then: Joi.required(),
    }),
  email: Joi.string().trim().normalize().max(255).trim().email().optional(),
});

const updateContactSchema = Joi.object().keys({
  number: Joi.string()
    .trim()
    .normalize()
    .length(9)
    .pattern(/^[0-9]+$/)
    .optional(),
  landline_number: Joi.string()
    .normalize()
    .length(9)
    .pattern(/^[0-9]+$/)
    .optional(),
  address: Joi.string().normalize().max(255).optional(),
  email: Joi.string().trim().normalize().max(255).trim().email().optional(),
});

const deleteContactSchema = Joi.object({
  id: Joi.number().positive().greater(0).required(),
});

export { createContactSchema, updateContactSchema, deleteContactSchema };
