"use server";

import { connect } from "@/lib/db/db.connection";
import { Feedback } from "@/lib/model/feedback.model";
import { User } from "@/lib/model/user.model";
import { getData } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const feedbackId = searchParams.get("id");
    const userId = getData(request);
    if (!userId) {
      return NextResponse.json({
        message: "Unauthorized",
        success: false,
      });
    }
    if (!feedbackId) {
      return NextResponse.json({
        message: "Invalid feedback ID",
        status: 400,
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      return NextResponse.json({
        message: "Feedback not found",
        success: false,
      });
    }
    if (user._id.toString() !== feedback.user._id.toString()) {
      return NextResponse.json({
        message: "Unauthorized to delete this feedback",
        status: 401,
      });
    }

    await Feedback.findByIdAndDelete(feedbackId);

    return NextResponse.json({
      message: "Feedback deleted successfully",
      success: true,
    });
  } catch {
    return NextResponse.json({
      status: 500,
      message: "Error while deleting feedback",
    });
  }
}
