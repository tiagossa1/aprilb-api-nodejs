import type Joi from "joi";
import _ from "lodash";
import logger from "../configs/logger.js";
import BaseResponse from "../models/response/response.js";

const validateRequest = <T>(schema: Joi.ObjectSchema<any>, obj: T, objName: string) => {
  const validation = schema.validate(obj, {
    abortEarly: false,
  });

  const isValid = validation.error == null;

  if (!isValid) {
    const errors = _(validation.error.message.split("."))
      .map((errorMsg) => `${errorMsg.trim()}.`)
      .value();

    logger.warn(`${objName} did not passed validation: ${errors}`);

    const response = new BaseResponse({
      statusCode: 422,
      errors: [`Error - ${objName} did not passed validation.`],
    });

    return response;
  }

  return new BaseResponse({
    success: true,
  });
};

export { validateRequest };
