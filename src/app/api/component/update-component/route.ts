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

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const id = searchParams.get("id");
    const userId = getData(request);

    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const formData = await request.formData();

    // Extract component data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;
    const liveCode = formData.get("liveCode") as string | undefined;
    const componentPath = formData.get("componentPath") as string;
    const codeSnippet = formData.get("codeSnippet") as string;
    const componentCode = formData.get("componentCode") as string;
    const componentsUses = formData.get("componentsUses") as string;

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
    let imageUrl = component.image;
    if (imageFile) {
      if (component.image) {
        const imagePublicId = extractPublicId(component.image)
        await deleteFileFromCloudinary(imagePublicId , "image");
      }
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = await uploadFileToCloudinary(buffer, "image");
    }

    // Update video
    let videoUrl = component.video;
    if (videoFile) {
      if (component.video) {
        const videoPublicId = extractPublicId(component.video)
        await deleteFileFromCloudinary(videoPublicId , "image");
      }
      const buffer = Buffer.from(await videoFile.arrayBuffer());
      videoUrl = await uploadFileToCloudinary(buffer, "video");
    }

    // Update the component in the database
    const updatedComponent = await Component.findByIdAndUpdate(
      id,
      {
        title,
        description,
        type,
        liveCode,
        componentPath,
        codeSnippet,
        componentCode,
        componentsUses,
        image: imageUrl,
        video: videoUrl,
      },
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
