"use server";

import { connect } from "@/lib/db/db.connection";
import { Feedback } from "@/lib/model/feedback.model";
import { NextResponse } from "next/server";

connect();
export async function GET() {
  try {
    const feedback = await Feedback.find();
    if (!feedback) {
      return NextResponse.json({
        status: 404,
        message: "No feedback found",
      });
    }
    return NextResponse.json(feedback);
  } catch {
    return NextResponse.json({
      status: 500,
      message: "An error occurred while getting feedback",
    });
  }
}
