import Joi from "joi";
import paginationSchema from "./pagination.js";

const getTripSchema = paginationSchema.keys({
  filters: Joi.object({
    text: Joi.string().trim().normalize().max(255).empty("").optional(),
    tripTypeCode: Joi.string().trim().normalize().max(255).empty("").optional(),
    dateStart: Joi.date()
      .greater(new Date(2014, 0, 1))
      .empty("")
      .allow(null)
      .optional(),
    dateEnd: Joi.date()
      .greater(new Date(2014, 0, 1))
      .less(new Date(2099, 0, 1))
      .allow(null)
      .empty("")
      .optional(),
  })
    .allow(null)
    .optional(),
});

const createTripSchema = Joi.object({
  name: Joi.string().trim().normalize().max(255).required(),
  tripTypeCode: Joi.string().trim().normalize().max(255).required(),
  tripPosterFileName: Joi.string()
    .trim()
    .normalize()
    .allow(null)
    .empty("")
    .max(255)
    .optional(),
  destination: Joi.string().trim().normalize().max(255).required(),
  description: Joi.string()
    .trim()
    .normalize()
    .max(255)
    .allow(null)
    .empty("")
    .optional(),
  totalSeats: Joi.number().positive().required(),
  date: Joi.date()
    .iso()
    .min(new Date(2014, 0, 1))
    .max(new Date(2099, 0, 1))
    .required(),
  memberTrip: Joi.array()
    .optional()
    .empty(Joi.array().length(0))
    .default([])
    .items(
      Joi.object().keys({
        memberId: Joi.number().positive().required(),
        reservedSeats: Joi.number().positive().required(),
        paidAmount: Joi.number().positive().required(),
      })
    ),
  nonMemberTrip: Joi.array().items(
    Joi.object().keys({
      nonMemberId: Joi.number().positive().required(),
      reservedSeats: Joi.number().positive().required(),
      paidAmount: Joi.number().positive().required(),
    })
  ),
});

const updateTripSchema = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string()
    .trim()
    .normalize()
    .max(255)
    .allow(null)
    .empty("")
    .optional(),
  tripTypeCode: Joi.string()
    .trim()
    .normalize()
    .max(255)
    .allow(null)
    .empty("")
    .optional(),
  tripPosterFileName: Joi.string()
    .trim()
    .normalize()
    .allow(null)
    .empty("")
    .max(255)
    .optional(),
  destination: Joi.string()
    .trim()
    .normalize()
    .max(255)
    .allow(null)
    .empty("")
    .optional(),
  description: Joi.string()
    .trim()
    .normalize()
    .max(255)
    .allow(null)
    .empty("")
    .optional(),
  totalSeats: Joi.number().positive().allow(null).empty("").optional(),
  date: Joi.date()
    .iso()
    .min(new Date(2014, 0, 1))
    .max(new Date(2099, 0, 1))
    .allow(null)
    .optional(),
  memberTrip: Joi.array()
    .optional()
    .empty(Joi.array().length(0))
    .default([])
    .items(
      Joi.object().keys({
        memberId: Joi.number().positive().required(),
        reservedSeats: Joi.number().positive().required(),
        paidAmount: Joi.number().positive().required(),
      })
    ),
  nonMemberTrip: Joi.array()
    .optional()
    .empty(Joi.array().length(0))
    .default([])
    .items(
      Joi.object().keys({
        nonMemberId: Joi.number().positive().required(),
        reservedSeats: Joi.number().positive().required(),
        paidAmount: Joi.number().positive().required(),
      })
    ),
});

const deleteTripSchema = Joi.object({
  id: Joi.number().positive().required(),
});

const lastTripSchema = Joi.object({
  take: Joi.number().positive().required(),
});

export {
  getTripSchema,
  createTripSchema,
  lastTripSchema,
  updateTripSchema,
  deleteTripSchema,
};
