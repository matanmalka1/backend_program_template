import { ApiError, API_ERROR_CODES } from "../constants/api-error-codes.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/response.js";

// Handle single file upload response payload.
export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(
      API_ERROR_CODES.FILE_UPLOAD_ERROR,
      "No file uploaded",
      400
    );
  }

  const fileInfo = {
    filename: req.file.filename,
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
  };

  successResponse(res, { file: fileInfo }, "File uploaded successfully", 201);
});
