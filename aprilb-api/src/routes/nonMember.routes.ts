import * as express from "express";
import type CreateNonMemberRequest from "../models/request/non-member/create-non-member.js";
import type UpdateNonMemberRequest from "../models/request/non-member/update-non-member.js";
import * as service from "../services/nonMember.service.js";
import auth from "../middlewares/auth.middleware.js";
import grantAccess from "../middlewares/grant-access.middleware.js";
import {
  createNonMemberSchema,
  updateNonMemberSchema,
  deleteNonMemberSchema,
  getNonMembersSchema,
} from "../validations/schemas/nonMember.js";
import { validateRequest } from "../utils/validation-utils.js";
import type GetNonMemberRequest from "../models/request/non-member/get-non-member.js";
import type DeleteNonMemberRequest from "../models/request/non-member/delete-non-member.js";

const router = express.Router();

router.get(
  "/",
  auth,
  grantAccess("readAny", "non-member"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Non Member']
    const request: GetNonMemberRequest = {
      skip: Number(req.query.skip ?? process.env.DEFAULT_SKIP),
      take: Number(req.query.take ?? process.env.DEFAULT_TAKE),
      filters: {
        text: String(req.query.text ?? ""),
      },
    };

    const validationResult = validateRequest(
      getNonMembersSchema,
      request,
      "GetNonMemberRequest"
    );

    if (!validationResult.success) {
      return res.status(validationResult.statusCode).json(validationResult);
    }

    const response = await service.get(request);
    res.status(response.statusCode).json(response);
  }
);

router.get(
  "/basic-non-member-info",
  auth,
  grantAccess("readAny", "non-member"),
  async (_req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Non Member']
    const response = await service.getBasicInfo();
    res.status(response.statusCode).json(response);
  }
);

router.post(
  "/",
  auth,
  grantAccess("createAny", "non-member"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Non Member']
    const request: CreateNonMemberRequest = {
      name: req.body.name,
      address: req.body.address,
      number: req.body.number,
      landline_number: req.body.landline_number,
      email: req.body.email,
    };

    const validationResult = validateRequest(
      createNonMemberSchema,
      request,
      "CreateNonMemberRequest"
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
  grantAccess("updateAny", "non-member"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Non Member']
    const request: UpdateNonMemberRequest = {
      id: Number(req.query.id),
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      landline_number: req.body.landline_number,
      number: req.body.number,
    };

    const validationResult = validateRequest(
      updateNonMemberSchema,
      request,
      "UpdateNonMemberRequest"
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
  grantAccess("deleteAny", "non-member"),
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Non Member']
    const request: DeleteNonMemberRequest = {
      id: Number(req.query.id),
    };

    const validationResult = validateRequest(
      deleteNonMemberSchema,
      request,
      "DeleteNonMemberRequest"
    );

    if (!validationResult.success) {
      return res.status(validationResult.statusCode).json(validationResult);
    }

    const response = await service.remove(request);

    res.status(response.statusCode).json(response);
  }
);

export default router;
