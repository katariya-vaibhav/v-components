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
    const { rating, comment }: ReviewProps = await request.json();

    const componentId = request.nextUrl.searchParams.get("id");

    const userId = getData(request);

    const component = await Component.findById(componentId);

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found.",
      });
    }

    if (!component) {
      return NextResponse.json({
        success: false,
        message: "component not found",
      });
    }

    const isReviewed = component.reviews.find(
      (rev: ReviewProps) => rev.user._id.toString() === user._id.toString()
    );

    if (isReviewed) {
      component.reviews.forEach((rev: ReviewProps) => {
        if (rev.user._id.toString() === user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      const review = {
        user: user._id,
        rating: rating,
        comment: comment,
      };
      component.reviews.push(review);
    }

    await component.save({ validateBeforeSave: false });

    return NextResponse.json({
      success: true,
      message: "review created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      message: "Error while creating review",
    });
  }
}
