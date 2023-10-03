import validator from "validator";

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  console.log(username, email, password);

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

  // Handling User Model later on
  try {
  } catch (err) {}

  res.status(200).json({ username, email, password });
};
