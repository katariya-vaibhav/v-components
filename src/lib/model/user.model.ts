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
        ref: "Component",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.users || model("User", userSchema);
