import mongoose, { Date, Schema } from "mongoose";


 interface IPermission extends Document{
    permission_name:String[],
    description: String,
    timestamps : Date
}


const permissionSchema = new Schema<IPermission>({
    permission_name: { type:[String] , required: true },
    description: { type: String, optional: true },
    timestamps: {
        type: Date,
        default: Date.now
    }
})

export const RolePermission = mongoose.model("Permission", permissionSchema)