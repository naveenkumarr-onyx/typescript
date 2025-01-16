import mongoose from "mongoose";

// Define the schema with the timestamps option
const roleSchema = new mongoose.Schema(
  {
    role_name: {
      type: String,
      required: true,
      unique: true, // Ensures role_name must be unique
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

const Role = mongoose.model("Role", roleSchema);
export default Role;
