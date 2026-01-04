import morgan from "morgan";
import { stream } from "../utils/logger.js";

export const requestLogger = morgan(
  ":method :url :status :response-time ms - :res[content-length]",
  { stream }
);
