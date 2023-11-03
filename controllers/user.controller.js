import validator from "validator";
import User from "../models/User.models.js";
import { hashPassword, generateJwtToken } from "../utils/auth.utils.js";
import bcrypt from "bcryptjs";
import { message_error } from "./constant.js";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate username is alphanumeric
  const isUsernameAlphanumeric = validator.isAlphanumeric(username);
  if (!isUsernameAlphanumeric) {
    return res.status(400).json({
      isSuccess: false,
      message: "Username must contain only numbers and letters.",
    });
  }

  // Validate email format
  const isEmailValid = validator.isEmail(email);
  if (!isEmailValid) {
    return res
      .status(400)
      .json({ isSuccess: false, message: "Email format is not valid." });
  }

  // Validate password is alphanumeric
  const isPasswordAlphanumeric = validator.isAlphanumeric(password);
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

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      username: username,
    });

    if (user === null) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "User doesn't exist" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Please input a correct username and password" });
    }

    const token = generateJwtToken({
      _id: String(user._id),
      username: user.username,
      email: user.email,
    });

    res
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({
        isSuccess: true,
        user: { _id: user._id, username: user.username, email: user.email },
        token,
      });
  } catch (err) {
    res.status(404).json({ isSuccess: false, message: err.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    return res
      .clearCookie("auth_token")
      .status(200)
      .json({ isSuccess: true, message: "Successfully logged out" });
  } catch (err) {
    return res
      .status(500)
      .json({ isSuccess: false, message: err + message_error });
  }
};

export const refreshToken = (req, res) => {
  try {
    // Get the refresh token from the Authorization header
    const refreshToken = req.header("Authorization");

    if (!refreshToken) {
      return res.status(401).json({ error: "Missing refresh token" });
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid refresh token" });
      }

      // Access user ID
      const { _id, username, email } = decoded;

      // Generate a new access token
      const newAccessToken = generateJwtToken({ _id, username, email });

      res.json({ accessToken: newAccessToken, data: decoded });
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message, // Handle errors properly
    });
  }
};
