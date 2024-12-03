"use server";

import { connect } from "@/lib/db/db.connection";
import { User } from "@/lib/model/user.model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const userId = searchParams.get("id");
    
    if (!userId) {
      return NextResponse.json({
        status: 400,
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(userId)
      .select("-password")
      .populate("components");
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }
    return NextResponse.json({
      user,
      success: true,
    });
  } catch (error) {
    console.log("error while getting user by id", error);
    return NextResponse.json({
      message: "Failed to get user by id",
      success: false,
    });
  }
}
