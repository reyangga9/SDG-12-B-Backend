import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minLength: [6, "Username must contain more than 6 character"],
      maxLength: [20, "Password must contain less than 20 character"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must contain more 6 character"],
      maxLength: [500, "Password must contain less than 220 character"],
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    is_super_user: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
