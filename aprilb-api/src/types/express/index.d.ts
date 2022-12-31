import express from "express";
import type TokenUser from "../../models/token-user";

declare global {
  namespace Express {
    interface Request {
      user: TokenUser;
    }
  }
}
