import BaseResponse from "../models/response/response.js";
import type { Request, NextFunction, Response } from "express";
import type { Permission } from "accesscontrol";
import roles from "../configs/roles.js";

const ac = roles();

const getPermission = (action: string, resource: string, roleCode: string) => {
  let permission: Permission | null = null;

  switch (action) {
    case "createAny":
      permission = ac.can(roleCode).createAny(resource);
      break;
    case "readAny":
      permission = ac.can(roleCode).readAny(resource);
      break;
    case "updateAny":
      permission = ac.can(roleCode).updateAny(resource);
      break;
    case "deleteAny":
      permission = ac.can(roleCode).deleteAny(resource);
      break;
    default:
      permission = { granted: false } as Permission;
      break;
  }

  return permission;
};

const grantAccess = (action: string, resource: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleCode: string = req.user.roleCode;
      const permission = getPermission(action, resource, roleCode);

      if (!permission?.granted) {
        const response = new BaseResponse({
          errors: ["Access denied."],
          statusCode: 401,
        });

        return res.status(response.statusCode).json(response);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default grantAccess;
