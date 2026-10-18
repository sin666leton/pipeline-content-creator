import pino from "pino";

export const activityLogger = pino({
  level: "info",
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    targets: [
      {
        target: "pino-pretty",
        options: { colorize: true },
        level: "info",
      },
      {
        target: "pino/file",
        options: { destination: "./logs/activity.log", mkdir: true },
        level: "info",
      },
    ],
  },
});