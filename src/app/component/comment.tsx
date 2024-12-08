"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import Link from "next/link";

interface ReviewProps {
  componentId: string;
  user: UserProps;
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

interface UserProps {
  _id: string;
  name: string;
}

const ReviewComponent: React.FC<ReviewProps> = ({ componentId, user }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `/api/component/get-review?id=${componentId}`
      );

      setReviews(res.data.component.reviews);
    } catch (error) {
      console.log("Error fetching reviews:", error);
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
      console.log("Error deleting review:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="h-auto mt-5">
      <h1 className="text-xl font-semibold text-zinc-400 px-2">{`Reviews (${reviews.length})`}</h1>

      {reviews.map((review) => (
        <div
          key={review._id}
          className="py-2 px-4 relative border-[1px] border-zinc-700 rounded-lg m-2"
        >
          <Link
            href={`/profile/${review.user._id}`}
            className="text-lg font-semibold text-zinc-300 break-words"
          >
            {review.user.name}
          </Link>
          <p className="break-words w-[90%]">{review.comment}</p>
          <p className="text-sm text-zinc-400">{`Rating: ${review.rating}/5`}</p>
          <div className="absolute top-5 right-5">
            {user?._id === review.user._id && (
              <button
                onClick={() => ReviewDeleteHandler(componentId, review._id)}
                className="py-[5px] px-2 bg-zinc-600 hover:bg-zinc-700 rounded-lg"
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
