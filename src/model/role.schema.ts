import mongoose, { Document, Schema } from "mongoose";


interface IRole extends Document{
  role_id:String,
  role_name: String,
  description : String,
  timestamps: Boolean,
  permissions : mongoose.Types.ObjectId[]
}


const roleSchema = new Schema<IRole>(
  {
    role_id :{
      type: String,
      unique: true,
      required: true,
    },
    role_name: {
      type: String,
      required: true,
      unique: true, 
    },
    description: {
      type: String,
      default: "",
    },
    permissions:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
    }]
  },
  {
    timestamps: true, 
  }
);

export const Role = mongoose.model<IRole>("Role", roleSchema);
