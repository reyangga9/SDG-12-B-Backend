import { verifyJwtToken } from "../utils/auth.utils.js";

export const validateAuth = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(401).json({
      isSuccess: false,
      message: "Token doesn't exist, you are not authorized!",
    });
  }
  try {
    const { data } = verifyJwtToken(token);
    req.user = data;
    return next();
  } catch {
    return res.status(401).json({
      isSuccess: false,
      message: "Token is not valid, you are not authorized!",
    });
  }
};
