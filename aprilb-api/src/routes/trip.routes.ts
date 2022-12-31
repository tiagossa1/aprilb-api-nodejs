import * as express from "express";
import type CreateTripResponse from "../models/request/trip/create-trip.js";
import type UpdateTripResponse from "../models/request/trip/update-trip.js";
import * as service from "../services/trip.service.js";
import auth from "../middlewares/auth.middleware.js";
import grantAccess from "../middlewares/grant-access.middleware.js";
import {
  getTripSchema,
  createTripSchema,
  deleteTripSchema,
  lastTripSchema,
  updateTripSchema,
} from "../validations/schemas/trip.js";
import { validateRequest } from "../utils/validation-utils.js";
import type GetTripRequest from "../models/request/trip/get-trip.js";
import type LastTripRequest from "../models/request/trip/last-trip.js";

const router = express.Router();

router.get(
  "/",
  auth,
  grantAccess("readAny", "trip"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Trip']
    const request: GetTripRequest = {
      skip: Number(req.query.skip ?? process.env.DEFAULT_SKIP),
      take: Number(req.query.take ?? process.env.DEFAULT_TAKE),
      filters: {
        text: String(req.query.text ?? ""),
        tripTypeCode: String(req.query.tripTypeCode ?? ""),
        dateStart: req.query.dateStart
          ? new Date(String(req.query.dateStart))
          : null,
        dateEnd: req.query.dateEnd ? new Date(String(req.query.dateEnd)) : null,
      },
    };

    const validationResult = validateRequest(
      getTripSchema,
      request,
      "GetTripRequest"
    );

    if (!validationResult.success) {
      return res.status(validationResult.statusCode).json(validationResult);
    }

    const response = await service.get(request);
    res.status(response.statusCode).json(response);
  }
);

router.get(
  "/last-trips",
  auth,
  grantAccess("readAny", "trip"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Trip']
    const request: LastTripRequest = {
      take: Number(req.query.take),
    };

    const validationResult = validateRequest(
      lastTripSchema,
      request,
      "LastTripRequest"
    );

    if (!validationResult.success) {
      return res.status(validationResult.statusCode).json(validationResult);
    }

    const response = await service.getLastTrips(request);
    res.status(response.statusCode).json(response);
  }
);

router.get(
  "/dashboard",
  auth,
  grantAccess("readAny", "trip"),
  async (_req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Trip']
    const response = await service.getTripsForDashboard();
    res.status(response.statusCode).json(response);
  }
);

router.post(
  "/",
  auth,
  grantAccess("createAny", "trip"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Trip']
    const request: CreateTripResponse = {
      name: req.body.name,
      tripTypeCode: req.body.tripTypeCode,
      destination: req.body.destination,
      description: req.body.description,
      totalSeats: Number(req.body.totalSeats),
      date: new Date(req.body.date),
      memberTrip: req.body.memberTrip,
      nonMemberTrip: req.body.nonMemberTrip,
    };

    const validationResult = validateRequest(
      createTripSchema,
      request,
      "CreateTripResponse"
    );

    if (!validationResult.success) {
      return res.status(validationResult.statusCode).json(validationResult);
    }

    const response = await service.create(request);
    res.status(response.statusCode).json(response);
  }
);

router.put(
  "/",
  auth,
  grantAccess("updateAny", "trip"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Trip']
    const request: UpdateTripResponse = {
      id: Number(req.query.id),
      name: req.body.name,
      tripTypeCode: req.body.tripTypeCode,
      destination: req.body.destination,
      description: req.body.description,
      totalSeats: req.body.totalSeats,
      date: req.body.date,
      memberTrip: req.body.memberTrip,
      nonMemberTrip: req.body.nonMemberTrip,
    };

    const validationResult = validateRequest(
      updateTripSchema,
      request,
      "UpdateTripResponse"
    );

    if (!validationResult.success) {
      return res.status(validationResult.statusCode).json(validationResult);
    }

    const response = await service.update(request);
    res.status(response.statusCode).json(response);
  }
);

router.delete(
  "/",
  auth,
  grantAccess("deleteAny", "trip"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Trip']
    const validationResult = validateRequest(
      deleteTripSchema,
      {
        id: req.query.id,
      },
      "DeleteTripRequest"
    );

    if (!validationResult.success) {
      return res.status(validationResult.statusCode).json(validationResult);
    }

    const id = Number(req.query.id);

    const response = await service.remove(id);
    res.status(response.statusCode).json(response);
  }
);

export default router;
