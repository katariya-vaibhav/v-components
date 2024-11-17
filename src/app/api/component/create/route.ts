"use server";

import { connect } from "@/lib/db/db.connection";
import { Component } from "@/lib/model/components.model";
import { User } from "@/lib/model/user.model";
import { getData } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

interface componentProps {
  title: string;
  description: string;
  type: string;
  liveCode: string;
  componentPath: string;
  codeSnippet: string;
  componentCode: string;
  componentsUses: string;
}

connect();
export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const {
      title,
      description,
      type,
      liveCode,
      componentPath,
      codeSnippet,
      componentCode,
      componentsUses,
    }: componentProps = req;

    const userId = getData(request);
    if (!userId) {
      return NextResponse.json({
        status: 401,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }

    const newComponent = await Component.create({
      title,
      description,
      type,
      liveCode,
      componentPath,
      codeSnippet,
      componentCode,
      componentsUses,
      owner: user._id,
    });

    const createdComponent = await Component.findById(
      newComponent._id
    ).populate({
      path: "owner",
      select: "-password",
    });

    if (!createdComponent) {
      return NextResponse.json({
        status: 500,
        message: "Failed to create component",
      });
    }

    await User.findByIdAndUpdate(
      user._id,
      {
        $push: { components: createdComponent._id },
      },
      {
        new: true,
      }
    );

    return NextResponse.json({
      status: 201,
      message: "Component created successfully.",
      data: createdComponent,
    });
  } catch (error) {
    console.log("error while creating component", error);
    return NextResponse.json({
      status: 500,
      message: "An error occurred while creating the component.",
    });
  }
}
