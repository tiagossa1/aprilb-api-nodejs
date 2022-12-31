import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import responseTime from "response-time";
import routes from "./routes/index.routes.js";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { isDevelopment } from "./utils/env-utils.js";
import swaggerFile from "./swagger-output.json" assert { type: "json" };

const port = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN_URL ?? "",
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use(cookieParser());

if (isDevelopment) {
  app.use(responseTime());
}

app.use(helmet());
app.disable("x-powered-by");

app.use("/", routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`API is listening on port ${port}.`);
});
