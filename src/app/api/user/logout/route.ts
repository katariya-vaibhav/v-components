"use server"
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json({
      message: "User logged out successfully",
      status: 200,
    });

    res.cookies.set("token", "", {
      expires: new Date(0), // Set the cookie to expire immediately
      path: "/",
      sameSite: "strict",
      secure: true,
      httpOnly: true,
      maxAge: 0,
    });

    return res;
  } catch (error) {
    console.log("error while logout user", error);
    return NextResponse.json(
      { error: "error while logout user" },
      { status: 500 }
    );
  }
}
