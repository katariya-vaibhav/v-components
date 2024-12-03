"use server";

import { connect } from "@/lib/db/db.connection";
import { Component } from "@/lib/model/components.model";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({
        status: 400,
        message: "Invalid component ID",
      });
    }

    const components = await Component.findById(id).populate({
      path: "owner",
      select: "name , email",
    });

    if (!components) {
      return NextResponse.json({
        status: 404,
        message: "No components found",
      });
    }
    return NextResponse.json({
      components,
    });
  } catch (error) {
    console.log("error while getting component", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to get component",
    });
  }
}
