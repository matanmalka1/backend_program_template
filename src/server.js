import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";

const envFile =
  process.env.NODE_ENV && process.env.NODE_ENV !== "production"
    ? `.env.${process.env.NODE_ENV}`
    : ".env";

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
  await connectDB();

  const port = +process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is live, Listening on port: ${port}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
