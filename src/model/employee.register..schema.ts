import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document{
  userName: string,
  password: string,
  email: string,
  phone: number,
  role_ids:mongoose.Types.ObjectId[],
  employee_id:String,
  create_at: Date,
}

const employeeRegisterSchema = new Schema<IUser>({
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
  employee_id:{
    type: String,
    required: true,
    unique: true,
  },
  create_at:{
    type: Date,
    default: Date.now,
  }
});

export const EmployeeRegister = mongoose.model("Employee", employeeRegisterSchema);
