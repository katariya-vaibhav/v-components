import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export const getData = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const decodedToken: any = jwt.verify(token, process.env.jwt_secret!);
    return decodedToken.userId;
  } catch (error) {
    console.log("error while getting data from token", error);
    return NextResponse.json({
      success: false,
      message: "Failed to get data from token",
    });
  }
};
