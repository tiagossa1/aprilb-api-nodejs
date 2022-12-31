import * as express from "express";
import type LoginUserRequest from "../models/request/user/login-user.js";
import type RegisterUserRequest from "../models/request/user/register-user.js";
import { addHours } from "date-fns";
import auth from "../middlewares/auth.middleware.js";
import * as service from "../services/user.service.js";
import BaseResponse from "../models/response/response.js";
import { loginSchema, registerSchema } from "../validations/schemas/user.js";
import { validateRequest } from "../utils/validation-utils.js";
// import { rateLimiterMiddleware } from "../middlewares/rate-limit.middleware.js";
import { getCurrentDate } from "../utils/date-utils.js";
import { isDevelopment } from "../utils/env-utils.js";

const router = express.Router();

router.get("/check", async (_req: express.Request, res: express.Response) => {
  res.status(200).json({ success: true });
});

router.get(
  "/is-logged-in",
  auth,
  async (_req: express.Request, res: express.Response) => {
    // #swagger.tags = ['User']
    const response = await service.isLogged();
    res.status(response.statusCode).json(response);
  }
);

// TODO: Change 'any' to express.Request and fix if does not work correctly.
router.get("/user-by-token", auth, async (req: any, res: express.Response) => {
  // #swagger.tags = ['User']
  const response = await service.getUserByEmail(req.user);
  res.status(response.statusCode).json(response);
});

router.post(
  "/login",
  // rateLimiterMiddleware,
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['User']
    const request: LoginUserRequest = {
      email: req.body.email,
      password: req.body.password,
    };

    const validationResult = validateRequest(
      loginSchema,
      request,
      "LoginUserRequest"
    );

    if (!validationResult.success) {
      return res.status(validationResult.statusCode).json(validationResult);
    }

    const response = await service.login(request);

    res.cookie("token", response?.data?.token, {
      secure: false,
      httpOnly: true,
      expires: addHours(getCurrentDate(), 1),
    });

    res.status(response.statusCode).json(
      new BaseResponse({
        statusCode: response.statusCode,
        success: response.success,
        data: { name: response.data?.name },
      })
    );
  }
);

// TODO: Change 'any' to express.Request and fix if does not work correctly.
router.get("/logout", auth, async (req: any, res: express.Response) => {
  // #swagger.tags = ['User']
  await service.logout({
    user: req.user,
  });

  res.clearCookie("token");

  const response = new BaseResponse({
    success: true,
  });

  res.status(response.statusCode).json(response);
});

// TODO: Remove this endpoint, this CANNOT be sent to production.
if (isDevelopment) {
  router.post(
    "/register",
    auth,
    // rateLimiterMiddleware,
    async (req: express.Request, res: express.Response) => {
      // #swagger.tags = ['User']
      const request: RegisterUserRequest = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        roleCode: req.body.roleCode,
      };

      const validationResult = validateRequest(
        registerSchema,
        request,
        "RegisterUserRequest"
      );

      if (!validationResult.success) {
        return res.status(validationResult.statusCode).json(validationResult);
      }

      const response = await service.register(request);

      res.cookie("token", response?.data?.token, {
        expires: addHours(getCurrentDate(), 1),
        httpOnly: true,
        secure: false,
      });

      res.status(response.statusCode).json({
        user: response.data?.user,
      });
    }
  );
}

export default router;
