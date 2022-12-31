import * as express from "express";
import * as service from "../services/tripType.service.js";
import auth from "../middlewares/auth.middleware.js";
import grantAccess from "../middlewares/grant-access.middleware.js";
import {
  createTripTypeSchema,
  updateTripTypeSchema,
  deleteTripTypeSchema,
} from "../validations/schemas/tripType.js";
import type UpdateTripTypeRequest from "../models/request/trip-type/update-trip-type.js";
import type CreateTripTypeRequest from "../models/request/trip-type/create-trip-type.js";
import { validateRequest } from "../utils/validation-utils.js";
import type DeleteTripTypeRequest from "../models/request/trip-type/delete-trip-type.js";

const router = express.Router();

router.get(
  "/",
  auth,
  grantAccess("readAny", "trip-type"),
  async (_req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Trip Type']
    const response = await service.get();
    res.status(response.statusCode).json(response);
  }
);

router.post(
  "/",
  auth,
  grantAccess("createAny", "trip-type"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Trip Type']
    const request: CreateTripTypeRequest = {
      code: req.body.code,
      name: req.body.name,
    };

    const validationResult = validateRequest(
      createTripTypeSchema,
      request,
      "CreateTripTypeSchema"
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
  grantAccess("updateAny", "trip-type"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Trip Type']
    const request: UpdateTripTypeRequest = {
      code: String(req.query.code),
      name: req.body.name,
    };

    const validationResult = validateRequest(
      updateTripTypeSchema,
      request,
      "UpdateTripTypeRequest"
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
  grantAccess("deleteAny", "trip-type"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Trip Type']
    const request: DeleteTripTypeRequest = {
      code: String(req.query.code),
    };

    const validationResult = validateRequest(
      deleteTripTypeSchema,
      request,
      "DeleteTripTypeRequest"
    );

    if (!validationResult.success) {
      return res.status(validationResult.statusCode).json(validationResult);
    }

    const response = await service.remove(request);
    res.status(response.statusCode).json(response);
  }
);

export default router;
