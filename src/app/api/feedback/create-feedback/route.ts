"use server";

import { connect } from "@/lib/db/db.connection";
import { Feedback } from "@/lib/model/feedback.model";
import { User } from "@/lib/model/user.model";
import { getData } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {
  try {
    const { feedback }: { feedback: string } = await request.json();
    const userId = getData(request);
    if (!feedback) {
      return NextResponse.json({
        status: 400,
        message: "Feedback content is required.",
      });
    }
    if (!userId) {
      return NextResponse.json({
        status: 401,
        message: "Unauthorized: Invalid or missing token",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found.",
      });
    }

    const newFeedback = await Feedback.create({
      user: user._id,
      feedback: feedback,
    });

    const createdFeedback = await Feedback.findById(newFeedback._id);

    if (!createdFeedback) {
      return NextResponse.json({
        status: 500,
        message: "Failed to create feedback.",
      });
    }

    return NextResponse.json({
      status: 201,
      message: "Feedback created successfully.",
      createdFeedback,
    });
  } catch {
    return NextResponse.json({
      status: 500,
      message: "An error occurred while creating feedback.",
    });
  }
}
