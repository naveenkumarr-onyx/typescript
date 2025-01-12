import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  role_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: " Role",
    },
  ],
  create_at:{
    type: Date,
    default: Date.now,
  }
});

export const User = mongoose.model("User", userSchema);
