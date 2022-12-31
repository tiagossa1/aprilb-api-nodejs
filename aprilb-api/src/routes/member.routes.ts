import * as express from "express";
import type CreateMemberRequest from "../models/request/member/create-member.js";
import type UpdateMemberRequest from "../models/request/member/update-member.js";
import * as service from "../services/member.service.js";
import auth from "../middlewares/auth.middleware.js";
import grantAccess from "../middlewares/grant-access.middleware.js";
import {
  createMemberSchema,
  updateMemberSchema,
  deleteMemberSchema,
  getByIdSchema,
  getMemberSchema,
} from "../validations/schemas/member.js";
import _ from "lodash";
import { validateRequest } from "../utils/validation-utils.js";
import type GetMemberRequest from "../models/request/member/get-member.js";
import type GetByIdMemberRequest from "../models/request/member/get-by-id-member.js";
import type DeleteMemberRequest from "../models/request/member/delete-member.js";

const router = express.Router();

router.get("/", auth, async (req: express.Request, res: express.Response) => {
  // #swagger.tags = ['Member']
  const request: GetMemberRequest = {
    skip: Number(req.query.skip ?? process.env.DEFAULT_SKIP),
    take: Number(req.query.take ?? process.env.DEFAULT_TAKE),
    filters: {
      text: String(req.query.text ?? ""),
    },
  };

  const validationResult = validateRequest(
    getMemberSchema,
    request,
    "GetMemberRequest"
  );

  if (!validationResult.success) {
    return res.status(validationResult.statusCode).json(validationResult);
  }

  const response = await service.get(request);
  return res.status(response.statusCode).json(response);
});

router.get(
  "/basic-member-info",
  auth,
  async (_req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Member']
    const response = await service.getBasicInfo();
    res.status(response.statusCode).json(response);
  }
);

router.get(
  "/dashboard",
  auth,
  grantAccess("readAny", "member"),
  async (_req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Member']
    const response = await service.getNewMembersByYearForDashboard();
    res.status(response.statusCode).json(response);
  }
);

router.get(
  "/:id",
  auth,
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Member']
    const request: GetByIdMemberRequest = {
      id: Number(req.params.id),
    };

    const validationResult = validateRequest(
      getByIdSchema,
      request,
      "GetByIdMemberRequest"
    );

    if (!validationResult.success) {
      return res.status(validationResult.statusCode).json(validationResult);
    }

    const response = await service.getById(request);
    res.status(response.statusCode).json(response);
  }
);

router.post(
  "/",
  auth,
  grantAccess("createAny", "member"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Member']
    const request: CreateMemberRequest = {
      id: req.body.id,
      name: req.body.name,
      address: req.body.address,
      number: req.body.number,
      landline_number: req.body.landline_number,
      email: req.body.email,
    };

    const validationResult = validateRequest(
      createMemberSchema,
      request,
      "CreateMemberRequest"
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
  grantAccess("updateAny", "member"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Member']
    const request: UpdateMemberRequest = {
      id: Number(req.query.id),
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      landline_number: req.body.landline_number,
      number: req.body.number,
    };

    const validationResult = validateRequest(
      updateMemberSchema,
      request,
      "UpdateMemberRequest"
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
  grantAccess("deleteAny", "member"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Member']
    const request: DeleteMemberRequest = {
      id: Number(req.query.id),
    };

    const validationResult = validateRequest(
      deleteMemberSchema,
      request,
      "DeleteMemberRequest"
    );

    if (!validationResult.success) {
      return res.status(validationResult.statusCode).json(validationResult);
    }

    const response = await service.remove(request);
    res.status(response.statusCode).json(response);
  }
);

export default router;
