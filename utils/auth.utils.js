import jwt from "jsonwebtoken";

export const generateJwtToken = (payload) => {
  const token = jwt.sign(payload, process.env.PRIVATE_KEY, {
    expiresIn: 60 * 60 * 24, // Momentary expire time
  });
  return token;
};

export const verifyJwtToken = (token) => {
  try {
    const data = jwt.verify(token, process.env.PRIVATE_KEY);
    if (data) {
      return { isTokenValid: true, data };
    }
  } catch (err) {
    return { isTokenValid: false, data: err };
  }
  return { isTokenValid: false, data: null };
};
