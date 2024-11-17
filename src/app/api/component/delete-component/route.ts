"use server";

import { connect } from "@/lib/db/db.connection";
import { Component } from "@/lib/model/components.model";
import { User } from "@/lib/model/user.model";
import { getData } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const componentId = searchParams.get("id");
    const userId = getData(request);
    if (!componentId) {
      return NextResponse.json({
        message: "Invalid component ID",
        status: 400,
      });
    }

    const user = await User.findById(userId);
    const component = await Component.findById(componentId);

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });
    }

    if (!component) {
      return NextResponse.json({
        message: "Component not found",
        status: 404,
      });
    }

    if (user._id.toString() !== component.owner._id.toString()) {
      return NextResponse.json({
        message: "Unauthorized to delete this component",
        status: 401,
      });
    }

    await Component.findByIdAndDelete(componentId);
    await User.findByIdAndUpdate(
      user._id,
      {
        $pull: { components: componentId },
      },
      {
        new: true,
      }
    );
    return NextResponse.json({
      message: "Component deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.log("error while deleting component: ", error);
    return NextResponse.json({
      message: "Error while deleting component",
      status: 500,
    });
  }
}
