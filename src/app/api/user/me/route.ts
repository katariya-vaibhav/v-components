"use server";
import { connect } from "@/lib/db/db.connection";
import { User } from "@/lib/model/user.model";
import { getData } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest) {
  try {
    const userId = getData(request);
    if (!userId) {
      return NextResponse.json({
        message: "Unauthorized",
        success: false,
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
    console.log("error while getting user ", error);
    return NextResponse.json({
      message: "Failed to get user",
      success: false,
    });
  }
}
