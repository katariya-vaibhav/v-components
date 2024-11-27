import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    components: [
      {
        type: Schema.Types.ObjectId,
        ref: "Component", // Reference to the Component model
      },
    ],
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

export const User = mongoose.models.User || model("User", userSchema);
