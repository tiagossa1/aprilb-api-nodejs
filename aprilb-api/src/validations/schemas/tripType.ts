import Joi from "joi";

const createTripTypeSchema = Joi.object({
  code: Joi.string().trim().normalize().max(255).required(),
  name: Joi.string().trim().normalize().max(255).required(),
});

const updateTripTypeSchema = Joi.object({
  code: Joi.string().trim().normalize().max(255).required(),
  name: Joi.string().trim().normalize().max(255).required(),
});

const deleteTripTypeSchema = Joi.object({
  code: Joi.string().trim().normalize().max(255).required(),
});

export { createTripTypeSchema, updateTripTypeSchema, deleteTripTypeSchema };
