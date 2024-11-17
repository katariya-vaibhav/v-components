"use server";

import { connect } from "@/lib/db/db.connection";
import { Component } from "@/lib/model/components.model";
import { User } from "@/lib/model/user.model";
import { getData } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connect();

interface componentProps {
  title: string;
  description: string;
  type: string;
  liveCode: string;
  componentPath: string;
  codeSnippet: string;
  componentCode: string;
  componentsUses: string;
}
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const id = searchParams.get("id");
    const userId = getData(request);
    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }
    const componentData: componentProps = await request.json();
    if (!componentData) {
      return NextResponse.json(
        { message: "Component data is required" },
        { status: 400 }
      );
    }

    const component = await Component.findById(id);
    const user = await User.findById(userId);
    if (!component) {
      return NextResponse.json(
        { message: "Component not found" },
        { status: 404 }
      );
    }
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (user._id.toString() !== component.owner._id.toString()) {
      return NextResponse.json(
        { message: "Unauthorized to update this component" },
        { status: 403 }
      );
    }

    const updatedComponent = await Component.findByIdAndUpdate(
      id,
      componentData,
      { new: true }
    );
    return NextResponse.json({ component: updatedComponent });
  } catch (error) {
    console.log("error while updating component", error);
    return NextResponse.json(
      { error: "error while updating component" },
      { status: 500 }
    );
  }
}
