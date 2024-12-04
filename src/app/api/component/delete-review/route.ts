"use server";

import { Component } from "@/lib/model/components.model";
import { getData } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

interface ReviewProps {
  _id: string;
  rating: number;
  comment: string;
  user: {
    _id: string;
    [key: string]: string;
  };
}
export async function DELETE(request: NextRequest) {
  try {
    const componentId = request.nextUrl.searchParams.get("id");
    const reviewId = request.nextUrl.searchParams.get("reviewId");

    if (!componentId) {
      return NextResponse.json(
        { status: 400, message: "Invalid component ID" },
        { status: 400 }
      );
    }

    if (!reviewId) {
      return NextResponse.json(
        { status: 400, message: "Invalid review ID" },
        { status: 400 }
      );
    }

    const userId = getData(request);
    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized: Invalid or missing token" },
        { status: 401 }
      );
    }

    // Fetch the component
    const component = await Component.findById(componentId);
    if (!component) {
      return NextResponse.json(
        { status: 404, message: "Component not found" },
        { status: 404 }
      );
    }

    // Find the review to delete
    const review = component.reviews.find(
      (review: ReviewProps) => review._id.toString() === reviewId.toString()
    );

    if (!review) {
      return NextResponse.json(
        { status: 404, message: "Review not found" },
        { status: 404 }
      );
    }

    // Ensure the user is the owner of the review
    if (review.user._id.toString() !== userId) {
      return NextResponse.json(
        {
          status: 403,
          message: "Forbidden: You can only delete your own reviews",
        },
        { status: 403 }
      );
    }

    // Remove the review using $pull
    await Component.findByIdAndUpdate(
      componentId,
      { $pull: { reviews: { _id: reviewId } } },
      { new: true }
    );

    return NextResponse.json(
      { status: 200, message: "Review deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { status: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}
