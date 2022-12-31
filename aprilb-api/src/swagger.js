import "dotenv/config";
import swaggerAutogen from "swagger-autogen";

const port = process.env.PORT;

const doc = {
  info: {
    version: "1.0.0",
    title: "APRILB API",
    description:
      "APRILB API - This API is intended to ONLY work within the APRILB project.",
  },
  host: `localhost:${port}`,
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.routes.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
