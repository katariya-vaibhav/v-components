"use client";

import React, { memo, useCallback, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/component/get-review?id=${componentId}`
      );
      setReviews(res.data.component.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  }, [componentId]);

  const ReviewDeleteHandler = useCallback(
    async (componentId: string, reviewId: string) => {
      try {
        await axios.delete(
          `/api/component/delete-review?id=${componentId}&reviewId=${reviewId}`
        );
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== reviewId)
        );
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    },
    []
  );

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div className="h-auto mt-5">
      <h1 className="text-xl font-semibold text-zinc-400 px-2">{`Reviews (${reviews.length})`}</h1>

      {loading ? (
        <p className="text-center text-zinc-400">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-zinc-400">No reviews available.</p>
      ) : (
        reviews.map((review) => (
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
            {user?._id === review.user._id && (
              <div className="absolute top-5 right-5">
                <button
                  onClick={() => ReviewDeleteHandler(componentId, review._id)}
                  className="py-[5px] px-2 bg-zinc-600 hover:bg-zinc-700 rounded-lg"
                  aria-label="Delete review"
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default memo(ReviewComponent);
