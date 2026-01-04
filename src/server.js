import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { logger } from "./utils/logger.js";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env"
    : `.env.${process.env.NODE_ENV || "development"}`;

const preferredDevEnv = path.join(process.cwd(), ".env.development");
const envPath = path.join(process.cwd(), envFile);

if (!process.env.NODE_ENV && fs.existsSync(preferredDevEnv)) {
  dotenv.config({ path: preferredDevEnv });
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

const startServer = async () => {
  try {
    await connectDB();

    const port = +process.env.PORT || 3000;
    app.listen(port, () => {
      logger.info(`Server is live, listening on port: ${port}`);
    });
  } catch (error) {
    logger.error('Failed to start server', { error: error.message });
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
  process.exit(1);
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', { reason, promise });
  process.exit(1);
});

startServer().catch((error) => {
  logger.error("Failed to start server", { error: error.message });
  process.exit(1);
});
