"use server";

import { connect } from "@/lib/db/db.connection";
import { Component } from "@/lib/model/components.model";
import { User } from "@/lib/model/user.model";
import { getData } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

interface ReviewProps {
  rating: number;
  comment: string;
  user: {
    _id: string;
    [key: string]: string;
  };
}

connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { rating, comment }: ReviewProps = await request.json();

    // Extract component ID and user ID
    const componentId = request.nextUrl.searchParams.get("id");
    if (!componentId) {
      return NextResponse.json(
        { success: false, message: "Component ID is required." },
        { status: 400 }
      );
    }

    const userId = getData(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing token." },
        { status: 401 }
      );
    }

    // Fetch the component and user
    const [component, user] = await Promise.all([
      Component.findById(componentId),
      User.findById(userId),
    ]);

    if (!component) {
      return NextResponse.json(
        { success: false, message: "Component not found." },
        { status: 404 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    // Check if the user has already reviewed
    // const existingReview = component.reviews.find(
    //   (review:ReviewProps) => review.user._id.toString() === user._id.toString()
    // );

    // if (existingReview) {
    //   existingReview.rating = rating;
    //   existingReview.comment = comment;
    // } else {
    //   // Add a new review
    //   component.reviews.push({
    //     user: user._id,
    //     rating,
    //     comment,
    //   });
    // }

    component.reviews.push({
      user: user._id,
      rating,
      comment,
    });

    // Save the component without re-validating fields
    await component.save({ validateBeforeSave: false });

    return NextResponse.json(
      { success: true, message: "Review submitted successfully." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Error while creating review." },
      { status: 500 }
    );
  }
}
