import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const generateJwtToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: 60 * 60 * 24, // Momentary expire time
  });
  return token;
};

export const verifyJwtToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return { isTokenValid: true, data: decodedToken };
  } catch (err) {
    return { isTokenValid: false, data: err.message };
  }
};
export const hashPassword = (plainPassword) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(plainPassword, salt);

  return hash;
};
