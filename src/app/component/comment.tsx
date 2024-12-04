"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";

interface ReviewProps {
  componentId: string;
}

interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  comment: string;
  rating: number;
}

interface ComponentResponse {
  _id: string;
  reviews: Review[];
}

interface UserProps {
  _id: string;
  name: string;
}

const ReviewComponent: React.FC<ReviewProps> = ({ componentId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const fetchReviews = async () => {
    try {
      const { data } = await axios.get<{ component: ComponentResponse }>(
        `/api/component/get-review?id=${componentId}`
      );
      setReviews(data.component.reviews);
      console.log(data.component.reviews);
    } catch (error) {
      console.log("Error fetching reviews:", error);
    }
  };
  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get("/api/user/me");
      setCurrentUser(data.user);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const ReviewDeleteHandler = async (componentId: string, reviewId: string) => {
    try {
      const res = await axios.delete(
        `/api/component/delete-review?id=${componentId}&reviewId=${reviewId}`
      );
      if (res.status === 200) {
        fetchReviews();
      } else {
        console.log("Error deleting review:", res.data.error);
      }
    } catch (error) {
      console.log("error deleting review", error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchReviews();
  }, [componentId]);

  return (
    <div className="h-auto mt-5">
      <h1 className="text-xl font-semibold text-zinc-400 px-2">{`Reviews (${reviews.length})`}</h1>

      {reviews.map((review) => (
        <div
          key={review._id}
          className="py-2 px-2 border-[1px] border-zinc-700 rounded-lg m-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <h2 className="text-lg font-semibold text-zinc-200">
                {review.user.name}
              </h2>
            </div>
          </div>
          <h2 className="">{review.comment}</h2>
          <p className="text-sm text-zinc-400">{`Rating: ${review.rating}/5`}</p>
          <div className="flex justify-end">
            {/* Placeholder delete logic */}
            {currentUser?._id === review.user._id && (
              <button
                onClick={() => ReviewDeleteHandler(componentId, review._id)}
                className="py-[5px] px-2 bg-zinc-700 rounded-lg"
              >
                <MdDelete />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewComponent;
