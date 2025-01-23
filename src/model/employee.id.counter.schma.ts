import mongoose, { modelNames, Schema } from "mongoose";



interface IgenerateEmployeId extends Document{
    seq: number,
    modelName: String
}

const generateEmployeeId = new Schema<IgenerateEmployeId> ({
    seq:{
        type: Number,
        required: true,
        default:1
    },
    modelName: {
        type: String,
        required: true,
        unique: true,
    }
})

export const Counter = mongoose.model("Counter",generateEmployeeId)