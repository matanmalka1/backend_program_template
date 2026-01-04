import {
  buildValidationError,
  isValidName,
  isNonEmptyString,
  isValidRoleId,
  isValidEmail,
  isValidPassword,
} from "./validatorUtils.js";

export const validateUserIdParam = (req, _res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return next(
      buildValidationError([
        { field: "id", message: "User id must be a positive integer" },
      ])
    );
  }

  return next();
};


export const validateCreateUser = (req, _res, next) => {
  const { email, password, firstName, lastName, roleId } = req.body ?? {};
  const errors = [];

  if (!isValidEmail(email)) {
    errors.push({ field: "email", message: "Email must be a valid address" });
  }

  if (!isValidName(firstName)) {
    errors.push({
      field: "firstName",
      message: "First name must be 2-15 letters with no spaces",
    });
  }

  if (!isValidName(lastName)) {
    errors.push({
      field: "lastName",
      message: "Last name must be 2-15 letters with no spaces",
    });
  }

  if (!isValidPassword(password)) {
    errors.push({
      field: "password",
      message:
        "Password must be at least 8 characters and include upper, lower, and number",
    });
  }

  if (!isValidRoleId(roleId)) {
    errors.push({ field: "roleId", message: "roleId must be a positive integer" });
  }

  if (errors.length) {
    return next(buildValidationError(errors));
  }

  return next();
};

export const validateUpdateUser = (req, _res, next) => {
  const { email, firstName, lastName, isActive, roleId } = req.body ?? {};
  const errors = [];

  if (email !== undefined) {
    if (!isNonEmptyString(email)) {
      errors.push({ field: "email", message: "Email is required" });
    } else if (!isValidEmail(email)) {
      errors.push({ field: "email", message: "Email must be a valid address" });
    }
  }

  if (firstName !== undefined && !isNonEmptyString(firstName)) {
    errors.push({ field: "firstName", message: "First name is required" });
  } else if (firstName !== undefined && !isValidName(firstName)) {
    errors.push({
      field: "firstName",
      message: "First name must be 2-15 letters with no spaces",
    });
  }

  if (lastName !== undefined && !isNonEmptyString(lastName)) {
    errors.push({ field: "lastName", message: "Last name is required" });
  } else if (lastName !== undefined && !isValidName(lastName)) {
    errors.push({
      field: "lastName",
      message: "Last name must be 2-15 letters with no spaces",
    });
  }

  if (isActive !== undefined && typeof isActive !== "boolean") {
    errors.push({ field: "isActive", message: "isActive must be a boolean" });
  }

  if (roleId !== undefined && !isValidRoleId(roleId)) {
    errors.push({
      field: "roleId",
      message: "roleId must be a positive integer",
    });
  }

  if (errors.length) {
    return next(buildValidationError(errors));
  }

  return next();
};
