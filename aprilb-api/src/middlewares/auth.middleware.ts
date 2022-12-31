import type * as express from "express";
import jwt from "jsonwebtoken";
import BaseResponse from "../models/response/response.js";
import type { TokenUser } from "../models/token-user.js";

// TODO: Change 'any' to express.Request and fix if does not work correctly.
const verifyToken = (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).send(
      new BaseResponse({
        errors: ["A token is required for this action."],
      })
    );
  }

  try {
    const userDecoded = jwt.verify(
      token,
      process.env.SECRET
    ) as TokenUser;

    req.user = userDecoded;
  } catch (err) {
    res.clearCookie("token");

    const response = new BaseResponse({
      errors: ["Invalid token."],
      statusCode: 401,
    });

    return res.status(response.statusCode).send(response);
  }

  next();
};

export default verifyToken;
