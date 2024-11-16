"use server";

import { connect } from "@/lib/db/db.connection";
import { User } from "@/lib/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
interface userDetails {
  name: string;
  email: string;
  password: string;
}

connect();
export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { name, email, password }: userDetails = req;

    if (!name || !email || !password) {
      return NextResponse.json({
        status: 400,
        message: "All fields are required.",
      });
    }
    const existingUser = await User.findOne({
      $or: [{ name }, { email }],
    });
    if (existingUser) {
      return NextResponse.json({
        status: 409,
        message: "User already exists.",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const createdUser = await User.findById(newUser._id);
    return NextResponse.json({
      status: 201,
      message: "User created successfully.",
      data: createdUser,
    });
  } catch (error) {
    console.log("error while creating user", error);
    return NextResponse.json({
      status: 500,
      message: "An error occurred while creating the user.",
    });
  }
}
