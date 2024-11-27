"use server";

import { connect } from "@/lib/db/db.connection";
import { Component } from "@/lib/model/components.model";
import {  NextResponse } from "next/server";

connect();
export async function GET() {
  try {
    const allComponents = await Component.find({})
    
    if (allComponents.length < 0) {
      return NextResponse.json({
        status: 404,
        message: "No components found",
      });
    }
    return NextResponse.json({
      components: allComponents,
    });
  } catch (error) {
    console.log("error while getting component", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to get component",
    });
  }
}
