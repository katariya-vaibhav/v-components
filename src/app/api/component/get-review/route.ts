"use server";

import { connect } from "@/lib/db/db.connection";
import { Component } from "@/lib/model/components.model";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest) {
  try {
    const componentId = request.nextUrl.searchParams.get("id");
    if (!componentId) {
      return NextResponse.json({
        status: 400,
        message: "Invalid component ID",
      });
    }

    const component = await Component.findById(componentId)
      .select("reviews")
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "name",
        },
      });
    if (!component) {
      return NextResponse.json({
        status: 404,
        message: "Component not found",
      });
    }
    return NextResponse.json({
      component,
    });
  } catch {
    return NextResponse.json({
      status: 500,
      message: "An error occurred",
    });
  }
}
