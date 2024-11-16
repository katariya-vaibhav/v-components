import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string; // Replace with the actual fields in your token payload
  [key: string]: unknown; // Optional: if the token may include additional fields
}
export const getData = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const decodedToken: any = jwt.verify(token, process.env.jwt_secret!) as DecodedToken;
    return decodedToken.userId;
  } catch (error) {
    console.log("error while getting data from token", error);
    return NextResponse.json({
      success: false,
      message: "Failed to get data from token",
    });
  }
};
