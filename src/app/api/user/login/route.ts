"use server";
import { connect } from "@/lib/db/db.connection";
import { User } from "@/lib/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
connect();

interface userDetails {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { email, password }: userDetails = req;

    if (!email || !password) {
      return NextResponse.json({
        status: 400,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }

    const currentDate = Date.now();

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({
        status: 401,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret!, {
      expiresIn: "365d",
    });

    const res = NextResponse.json({
      status: 200,
      message: "Login successful",
    });
    res.cookies.set("token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
      expires: new Date(currentDate + 60 * 60 * 24 * 365 * 1000),
    });
    return res;
  } catch (error) {
    console.log("error while login user", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to login user",
    });
  }
}
