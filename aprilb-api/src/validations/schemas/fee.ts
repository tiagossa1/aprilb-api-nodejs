import Joi from "joi";

const getFeeSchema = Joi.object({
  filters: Joi.object().keys({
    memberName: Joi.string()
      .trim()
      .normalize()
      .max(255)
      .allow(null)
      .empty("")
      .optional(),
    showFeesMissingSchedule: Joi.bool().allow(null).default(false).optional(),
    showFeesOnSchedule: Joi.bool().allow(null).default(false).optional(),
  }),
});

const createFeeSchema = Joi.object({
  year: Joi.number().positive().min(2014).max(2099).required(),
  paidAmount: Joi.number().positive().required(),
  memberId: Joi.number().positive().required(),
});

const updateFeeSchema = Joi.object({
  id: Joi.number().positive().required(),
  year: Joi.number().positive().min(2014).max(2099).required(),
  paidAmount: Joi.number().positive().required(),
  memberId: Joi.number().positive().required(),
});

const deleteFeeSchema = Joi.object({
  id: Joi.number().positive().required(),
});

export { getFeeSchema, createFeeSchema, updateFeeSchema, deleteFeeSchema };
