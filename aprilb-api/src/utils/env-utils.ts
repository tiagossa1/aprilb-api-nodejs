import { ENVIRONMENTS } from "./constants.js";

const isDevelopment = Object.freeze(
  process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT
);

export { isDevelopment };
