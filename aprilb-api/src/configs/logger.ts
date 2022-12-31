import winston, { format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new DailyRotateFile({
      filename: "logs/aprilb-api-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxFiles: "14d",
      maxSize: "20m",
    }),
    new winston.transports.Console({
      format: format.combine(
        format.timestamp(),
        format.ms(),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
        format.colorize({ all: true })
      ),
    }),
  ],
});

export default logger;
