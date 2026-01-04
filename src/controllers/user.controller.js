import * as userService from "../services/user.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/response.js";

// CREATE
export const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);

  successResponse(res, { user }, "User created successfully", 201);
});

// READ ALL
export const getAllUsers = asyncHandler(async (req, res) => {
  const result = await userService.getAllUsers(req.query);

  successResponse(res, result, "Users retrieved successfully");
});

// READ ONE
export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  successResponse(res, { user }, "User retrieved successfully");
});

// UPDATE
export const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);

  successResponse(res, { user }, "User updated successfully");
});

// DELETE
export const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);

  successResponse(res, null, "User deleted successfully");
});
