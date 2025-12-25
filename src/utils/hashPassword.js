import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 8);
  } catch (error) {
    console.error("Error hashing password", error.message);
  }
};

export const compareHash = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Error comparing password", error.message);
  }
};
