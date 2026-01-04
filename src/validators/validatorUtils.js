import { ApiError, API_ERROR_CODES } from "../constants/api-error-codes.js";

export const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

export const isValidName = (value) =>
  typeof value === "string" && /^[A-Za-z]{2,15}$/.test(value.trim());

export const isValidEmail = (value) =>
  typeof value === "string" && /^\S+@\S+\.\S+$/.test(value.trim());

export const isValidPassword = (value) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return typeof value === "string" && passwordRegex.test(value.trim());
};

export const isPositiveInteger = (value) =>
  Number.isInteger(value) && value > 0;

export const isValidRoleId = (value) => {
  if (value === null || value === undefined || value === "") {
    return false;
  }
  const numericValue = Number(value);
  return Number.isInteger(numericValue) && numericValue > 0;
};

export const buildValidationError = (details) =>
  new ApiError(API_ERROR_CODES.VALIDATION_ERROR, "Validation failed", 400, {
    fields: details,
  });
