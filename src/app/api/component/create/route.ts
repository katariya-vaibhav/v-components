"use server";

import { connect } from "@/lib/db/db.connection";
import { Component } from "@/lib/model/components.model";
import { User } from "@/lib/model/user.model";
import { getData } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { uploadFileToCloudinary } from "@/utils/cloudinaryUtils";

connect();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
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

    // Handle file uploads
    let imageUrl: string | null = null;
    let videoUrl: string | null = null;

    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      try {
        imageUrl = await uploadFileToCloudinary(buffer, "image");
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        return NextResponse.json({
          status: 400,
          message: "Failed to upload image file.",
        });
      }
    }

    if (videoFile) {
      const buffer = Buffer.from(await videoFile.arrayBuffer());
      try {
        videoUrl = await uploadFileToCloudinary(buffer, "video");
      } catch (uploadError) {
        console.error("Video upload failed:", uploadError);
        return NextResponse.json({
          status: 400,
          message: "Failed to upload video file.",
        });
      }
    }

    // Authenticate the user
    const userId = getData(request);
    if (!userId) {
      return NextResponse.json({
        status: 401,
        message: "Unauthorized. Please log in.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found.",
      });
    }

    // Create the component
    const newComponent = await Component.create({
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
      owner: user._id,
    });

    const createdComponent = await Component.findById(newComponent._id).populate({
      path: "owner",
      select: "-password",
    });

    if (!createdComponent) {
      return NextResponse.json({
        status: 500,
        message: "Failed to create component. Please try again later.",
      });
    }

    // Update the user's components list
    await User.findByIdAndUpdate(
      user._id,
      { $push: { components: createdComponent._id } },
      { new: true }
    );

    return NextResponse.json({
      status: 201,
      message: "Component created successfully.",
      data: createdComponent,
    });
  } catch (error: any) {
    console.error("Error while creating component:", error.message || error);
    return NextResponse.json({
      status: 500,
      message: "An unexpected error occurred while creating the component.",
    });
  }
}
