import bcrypt from "bcrypt";

// Hash a plaintext password with bcrypt.
export const hashPassword = async (password) => bcrypt.hash(password, 10);

// Compare a plaintext password with a bcrypt hash.
export const comparePassword = async (plainPassword, hashedPassword) =>
  bcrypt.compare(plainPassword, hashedPassword);
