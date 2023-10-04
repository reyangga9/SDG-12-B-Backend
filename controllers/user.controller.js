import validator from "validator";
import User from "../models/User.models.js";
import { hashPassword } from "../utils/auth.utils.js";

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate username is alphanumeric
  const isUsernameAlphanumeric = validator.isAlphanumeric(String(username));
  if (!isUsernameAlphanumeric) {
    return res.status(400).json({
      isSuccess: false,
      message: "Username must contain only numbers and letters.",
    });
  }

  // Validate email format
  const isEmailValid = validator.isEmail(String(email));
  if (!isEmailValid) {
    return res
      .status(400)
      .json({ isSuccess: false, message: "Email format is not valid." });
  }

  // Validate password is alphanumeric
  const isPasswordAlphanumeric = validator.isAlphanumeric(String(password));
  if (!isPasswordAlphanumeric) {
    return res.status(400).json({
      isSuccess: false,
      message: "Password must contain only numbers and letters.",
    });
  }

  const hashedPassword = hashPassword(password);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res
      .status(201)
      .json({ isSuccess: true, message: "Successfully registered!" });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
