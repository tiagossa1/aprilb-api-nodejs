import TokenUser from "../models/token-user.js";
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_CONNECTION_STRING: string;
      REDIS_CONNECTION_STRING: string;
      HOST: string;
      PORT: string;
      DEFAULT_SKIP: string;
      DEFAULT_TAKE: string;
      SECRET: string;
      NODE_ENV: string;
      RATE_LIMIT_TIME: string;
      RATE_LIMIT_MAX_REQUEST: string;
      CORS_ORIGIN_URL: string;
    }
  }
}
