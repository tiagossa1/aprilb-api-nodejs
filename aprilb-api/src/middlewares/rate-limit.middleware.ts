import type { NextFunction, Response } from "express";
import rateLimiter from "../configs/rate-limiter.js";
import { isDevelopment } from "../utils/env-utils.js";

const rateLimiterMiddleware = (req: any, res: Response, next: NextFunction) => {
  if (isDevelopment) {
    return next();
  }

  rateLimiter
    .consume(req.id)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send("Too many requests.");
    });
};

export { rateLimiterMiddleware };
