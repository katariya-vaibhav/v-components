"use server";

import { connect } from "@/lib/db/db.connection";
import { Feedback } from "@/lib/model/feedback.model";
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const feedback = await Feedback.find();

    if (!feedback || feedback.length === 0) {
      return NextResponse.json({
        status: 404,
        message: "No feedback found",
      });
    }

    let resultFeedback;

    if (feedback.length > 10) {
      // Shuffle and select 7–8 random feedback
      const shuffledFeedback = feedback.sort(() => 0.5 - Math.random());
      const randomCount = Math.floor(Math.random() * 2) + 7; // Randomly choose 7 or 8
      resultFeedback = shuffledFeedback.slice(0, randomCount);
    } else {
      resultFeedback = feedback; // Return all feedback if length <= 10
    }

    return NextResponse.json(resultFeedback);
  } catch {
    return NextResponse.json({
      status: 500,
      message: "An error occurred while getting feedback",
    });
  }
}
