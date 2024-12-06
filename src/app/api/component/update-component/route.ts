"use server";

import { connect } from "@/lib/db/db.connection";
import { Component } from "@/lib/model/components.model";
import { User } from "@/lib/model/user.model";
import { getData } from "@/utils/getDataFromToken";
import {
  uploadFileToCloudinary,
  deleteFileFromCloudinary,
} from "@/utils/cloudinaryUtils";
import { NextRequest, NextResponse } from "next/server";

connect();

function extractPublicId(url: string): string {
  const parts = url.split("/");
  const fileWithExtension = parts[parts.length - 1];
  const [publicId] = fileWithExtension.split(".");
  return `${parts[parts.length - 2]}/${publicId}`;
}

interface UpdateFields {
  title?: string;
  description?: string;
  type?: string;
  liveCode?: string;
  componentPath?: string;
  codeSnippet?: string;
  componentCode?: string;
  componentsUses?: string;
  image?: string;
  video?: string;
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const id = searchParams.get("id");
    const userId = getData(request);

    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const formData = await request.formData();

    // Define the fields to update
    const fieldsToUpdate: UpdateFields = {};

    const title = formData.get("title");
    const description = formData.get("description");
    const type = formData.get("type");
    const liveCode = formData.get("liveCode");
    const componentPath = formData.get("componentPath");
    const codeSnippet = formData.get("codeSnippet");
    const componentCode = formData.get("componentCode");
    const componentsUses = formData.get("componentsUses");

    // Add fields to the update object only if they are not null
    if (typeof title === "string") fieldsToUpdate.title = title;
    if (typeof description === "string")
      fieldsToUpdate.description = description;
    if (typeof type === "string") fieldsToUpdate.type = type;
    if (typeof liveCode === "string") fieldsToUpdate.liveCode = liveCode;
    if (typeof componentPath === "string")
      fieldsToUpdate.componentPath = componentPath;
    if (typeof codeSnippet === "string")
      fieldsToUpdate.codeSnippet = codeSnippet;
    if (typeof componentCode === "string")
      fieldsToUpdate.componentCode = componentCode;
    if (typeof componentsUses === "string")
      fieldsToUpdate.componentsUses = componentsUses;

    // Extract files
    const imageFile = formData.get("image") as File | null;
    const videoFile = formData.get("video") as File | null;

    const component = await Component.findById(id);
    const user = await User.findById(userId);

    if (!component) {
      return NextResponse.json(
        { message: "Component not found" },
        { status: 404 }
      );
    }

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (user._id.toString() !== component.owner._id.toString()) {
      return NextResponse.json(
        { message: "Unauthorized to update this component" },
        { status: 403 }
      );
    }

    // Update image
    if (imageFile) {
      if (component.image) {
        const imagePublicId = extractPublicId(component.image);
        await deleteFileFromCloudinary(imagePublicId, "image");
      }
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      fieldsToUpdate.image = await uploadFileToCloudinary(buffer, "image");
    }

    // Update video
    if (videoFile) {
      if (component.video) {
        const videoPublicId = extractPublicId(component.video);
        await deleteFileFromCloudinary(videoPublicId, "video");
      }
      const buffer = Buffer.from(await videoFile.arrayBuffer());
      fieldsToUpdate.video = await uploadFileToCloudinary(buffer, "video");
    }

    // Update only the provided fields in the database
    const updatedComponent = await Component.findByIdAndUpdate(
      id,
      { $set: fieldsToUpdate },
      { new: true }
    );

    return NextResponse.json({
      message: "Component updated successfully",
      component: updatedComponent,
    });
  } catch (error) {
    console.error("Error while updating component:", error);
    return NextResponse.json(
      { message: "Error while updating component" },
      { status: 500 }
    );
  }
}
