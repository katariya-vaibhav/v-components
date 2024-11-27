import mongoose, { Schema, model } from "mongoose";

// Define the Component schema
const componentSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
    componentPath: {
      type: String,
      required: true, // Path to the component file or folder
    },
    title: {
      type: String,
      required: true, // Title of the component
    },
    description: {
      type: String,
      required: true, // Description of the component's functionality
    },
    codeSnippet: {
      type: String,
      required: true, // A code snippet for demonstration
    },
    componentCode: {
      type: String,
      required: true, // The main code defining the component
    },
    componentsUses: {
      type: String,
      required: true, // Usage information or examples
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // Ensure a component must have an owner
    },
    liveCode: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

// Create the Component model
export const Component = mongoose.models.Component || model("Component", componentSchema);
