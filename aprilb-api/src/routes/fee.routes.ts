import type CreateFeeRequest from "../models/request/fee/create-fee.js";
import type UpdateFeeRequest from "../models/request/fee/update-fee.js";
import * as express from "express";
import auth from "../middlewares/auth.middleware.js";
import grantAccess from "../middlewares/grant-access.middleware.js";
import * as service from "../services/fee.service.js";
import {
  getFeeSchema,
  createFeeSchema,
  deleteFeeSchema,
  updateFeeSchema,
} from "../validations/schemas/fee.js";
import { validateRequest } from "../utils/validation-utils.js";
import type DeleteFeeRequest from "../models/request/fee/delete-fee.js";
import type GetFeeRequest from "../models/request/fee/get-fee.js";

const router = express.Router();

router.get(
  "/",
  auth,
  grantAccess("readAny", "fee"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Fee']
    const request: GetFeeRequest = {
      filters: {
        memberName: String(req.query.memberName ?? ""),
        showFeesMissingSchedule: Boolean(
          JSON.parse(req.query.showFeesMissingSchedule as string)
        ),
        showFeesOnSchedule: Boolean(
          JSON.parse(req.query.showFeesOnSchedule as string)
        ),
      },
    };

    const validationResult = validateRequest(
      getFeeSchema,
      request,
      "GetFeeSchema"
    );

    if (!validationResult.success) {
      return res.status(validationResult.statusCode).json(validationResult);
    }

    const getResponse = await service.get(request);

    res.status(getResponse.statusCode).json(getResponse);
  }
);

router.post(
  "/",
  auth,
  grantAccess("createAny", "fee"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Fee']
    const request: CreateFeeRequest = {
      memberId: Number(req.body.memberId),
      paidAmount: Number(req.body.paidAmount),
      year: Number(req.body.year),
    };

    const validationResult = validateRequest(
      createFeeSchema,
      request,
      "CreateFeeRequest"
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
  grantAccess("updateAny", "fee"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Fee']
    const request: UpdateFeeRequest = {
      id: Number(req.query.id),
      memberId: Number(req.body.memberId),
      year: Number(req.body.year),
      paidAmount: Number(req.body.paidAmount),
    };

    const validationResult = validateRequest(
      updateFeeSchema,
      request,
      "UpdateFeeRequest"
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
  grantAccess("deleteAny", "fee"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Fee']
    const request: DeleteFeeRequest = {
      id: Number(req.query.id),
    };

    const validationResult = validateRequest(
      deleteFeeSchema,
      request,
      "DeleteFeeRequest"
    );

    if (!validationResult.success) {
      return res.status(validationResult.statusCode).json(validationResult);
    }

    const response = await service.remove(request.id);
    res.status(response.statusCode).json(response);
  }
);

export default router;
