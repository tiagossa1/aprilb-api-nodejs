import RedisWrapper from "../wrappers/redis.wrapper.js";
import { RateLimiterRedis } from "rate-limiter-flexible";

const redisClient = await RedisWrapper.getClient();

// If no rate limit time is provided in the .env file, use 60 minutes.
const rateLimitTime = Number(process.env.RATE_LIMIT_TIME ?? "60");

// If no rate limit maximum requests is provided in the .env file, use 100 requests.
const rateLimitMaxRequest = Number(process.env.RATE_LIMIT_MAX_REQUEST ?? "100");

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "middleware",
  points: rateLimitMaxRequest,
  duration: rateLimitTime,
});

export default rateLimiter;
