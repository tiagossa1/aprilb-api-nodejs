import Joi from "joi";

const paginationSchema = Joi.object().keys({
  skip: Joi.number().min(0).optional(),
  take: Joi.number().positive().optional(),
});

export default paginationSchema;
