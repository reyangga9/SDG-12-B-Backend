import { verifyJwtToken } from "../utils/auth.utils.js";

export const validateAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({
      isSuccess: false,
      message: "Bearer token is missing, you are not authorized!",
    });
  }

  const authToken = token.replace("Bearer ", "");

  try {
    const { data } = verifyJwtToken(authToken);
    req.user = data;
    return next();
  } catch {
    return res.status(401).json({
      isSuccess: false,
      message: "Token is not valid, you are not authorized!",
    });
  }
};
