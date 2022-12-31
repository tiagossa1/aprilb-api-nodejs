import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { TokenUser } from "../models/token-user.js";
import BaseResponse from "../models/response/response.js";
import type LoginUserRequest from "../models/request/user/login-user.js";
import type { LoginUserResponse } from "../models/response/login-user.js";
import type RegisterUserRequest from "../models/request/user/register-user.js";
// import RedisWrapper from "../wrappers/redis.wrapper.js";
import logger from "../configs/logger.js";

const prisma = new PrismaClient();
// const redisClient = await RedisWrapper.getClient();

// const GET_USER_BY_EMAIL_CACHE_KEY = `user_{0}`;

const getUserByEmail = async (tokenUser: TokenUser) => {
  // const cacheKey = GET_USER_BY_EMAIL_CACHE_KEY.replace("{0}", tokenUser.email);
  // const userCached = await redisClient.get(cacheKey);

  // if (userCached) {
  //   return new BaseResponse<{
  //     name: string;
  //     roleCode: string;
  //   }>({
  //     data: JSON.parse(userCached),
  //   });
  // }

  const user = await prisma.user.findFirst({
    where: {
      email: tokenUser.email,
    },
    select: {
      name: true,
      roleCode: true,
    },
  });

  if (!user) {
    logger.warn(`getUserByEmail: could not find user ${tokenUser.email}.`);

    return new BaseResponse({
      errors: ["Error retrieving user by email."],
      statusCode: 404,
    });
  }

  // await redisClient.set(cacheKey, JSON.stringify(user), {
  //   EX: 3600,
  //   NX: true,
  // });

  return new BaseResponse<{
    name: string;
    roleCode: string;
  }>({
    data: user,
  });
};

const isLogged = async () => {
  return new BaseResponse({
    success: true,
    statusCode: 200,
  });
};

const login = async (request: LoginUserRequest) => {
  logger.info("Received a request to login with email %s.", request.email);

  const user = await prisma.user.findFirst({
    where: {
      email: request.email,
    },
  });

  if (!user) {
    logger.warn(
      "Error logging in: Could not found user with email %s.",
      request.email
    );

    return new BaseResponse({
      errors: ["Error logging in."],
      statusCode: 404,
    });
  }

  if (bcrypt.compareSync(request.password, user.password)) {
    const token = jwt.sign(
      {
        email: user.email,
        roleCode: user.roleCode,
      } as TokenUser,
      (process.env.SECRET as unknown) as string,
      {
        expiresIn: "1h",
      }
    );

    // const cacheKey = GET_USER_BY_EMAIL_CACHE_KEY.replace("{0}", user.email);
    // const cacheBody = {
    //   name: user.name,
    //   roleCode: user.roleCode,
    // };

    // await redisClient.set(cacheKey, JSON.stringify(cacheBody), {
    //   EX: 3600,
    //   NX: true,
    // });

    const response = new BaseResponse<LoginUserResponse>({
      data: {
        name: user.name,
        token: token,
      },
    });

    return response;
  }

  logger.error("Attempted login for %s failed.", request.email);

  return new BaseResponse({
    errors: ["Error logging in."],
    statusCode: 401,
  });
};

const logout = async (request: { user: TokenUser }) => {
  logger.info(
    "Received a request to logout with email %s.",
    request.user.email
  );

  // const cacheKey = GET_USER_BY_EMAIL_CACHE_KEY.replace(
  //   "{0}",
  //   request.user.email
  // );

  // await redisClient.del(cacheKey);
};

const register = async (request: RegisterUserRequest) => {
  logger.info("Received a request to register with email %s.", request.email);

  const userWithSameEmail = await prisma.user.count({
    where: {
      email: {
        equals: request.email,
      },
    },
  });

  if (userWithSameEmail > 0) {
    logger.warn(
      "Could not register with email %s: user already exists.",
      request.email
    );

    return new BaseResponse({
      errors: ["Error registering user."],
      statusCode: 400,
    });
  }

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(request.password, salt);

  const user = await prisma.user.create({
    data: {
      email: request.email,
      name: request.name,
      password: encryptedPassword,
      roleCode: request.roleCode,
    },
  });

  const token = jwt.sign(
    {
      email: user.email,
      roleCode: user.roleCode,
    },
    process.env.SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  logger.info("User with email %s registered successfully.", request.email);

  return new BaseResponse<{ user: User; token: string }>({
    data: {
      user,
      token,
    },
  });
};

export { getUserByEmail, isLogged, login, logout, register };
