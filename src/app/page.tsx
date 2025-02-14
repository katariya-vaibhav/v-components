"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReviewCard } from "./component/ReviewCard";
import Link from "next/link";
import useUserData from "@/utils/getUserData";

interface FeedbackProps {
  _id: number;
  feedback: string;
  user: {
    _id: string;
    name: string;
  };
}

export default function Home() {
  const [feedback, setFeedback] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [reviews, setReviews] = useState<FeedbackProps[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { currentUserId, isUserSignedIn } = useUserData();

  useEffect(() => {
    fetchAllFeedback();
  }, []);

  const fetchAllFeedback = async () => {
    try {
      const { data } = await axios.get("/api/feedback/get-feedback");
      setReviews(data);
    } catch {
      alert("Error fetching feedback.");
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isUserSignedIn) {
      router.push("/auth");
      return;
    }

    try {
      setIsSaving(true);
      const { data } = await axios.post("/api/feedback/create-feedback", { feedback });

      if (data.status === 201) {
        alert("Feedback submitted successfully.");
        setFeedback("");
        fetchAllFeedback();
      }

      setShowDialog(false);
    } catch {
      alert("Error submitting feedback.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { data } = await axios.delete(`/api/feedback/delete-feedback?id=${id}`);

      if (data.success) {
        alert(data.message);
        fetchAllFeedback();
      }
    } catch {
      alert("Error deleting feedback.");
    }
  };

  const renderFeedbackForm = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-50 z-50">
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Add your feedback</h3>
          <button
            onClick={() => setShowDialog(false)}
            className="text-zinc-200 hover:text-zinc-300"
            aria-label="Close Feedback Form"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleFeedbackSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-medium text-zinc-400 mb-1">
              Write your feedback here
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full bg-zinc-800 rounded-md p-2 text-sm"
              placeholder="Enter your thoughts..."
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowDialog(false)}
              className="px-4 py-2 text-sm bg-zinc-500 hover:bg-zinc-600 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="text-zinc-50 bg-zinc-900 font-sans">
      <main className="container mx-auto px-6 py-10">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Welcome to V-Components/UI</h2>
          <p className="text-lg text-zinc-300">
            Build stunning interfaces with our highly customizable and intuitive components.
          </p>
          <p className="text-zinc-300 mb-6">
            v-components/ui is an open-source React/Next.js component library.
          </p>
          <button className="bg-zinc-600 hover:bg-zinc-700 py-2 px-3 rounded-md font-semibold">
            <Link href="/components/installation">Get Started</Link>
          </button>
        </section>

        {reviews.length > 0 ? (
          <Swiper
          direction={"vertical"}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          modules={[Mousewheel, Pagination]}
          className="feedback"
          >
            {reviews.map((review) => (
              <SwiperSlide key={`slide-${review._id}`}>
                <ReviewCard
                  key={review._id}
                  username={review.user.name}
                  feedbackId={review.user._id}
                  userId={currentUserId}
                  feedback={review.feedback}
                  onDelete={() => handleDelete(review._id)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center">Loading feedback...</p>
        )}

        <section className="text-center my-7">
          <h3 className="text-2xl font-bold mb-4">Your Feedback Matters</h3>
          <p className="text-zinc-300 mb-6">
            Help us make V-components/UI even better. Share your thoughts and suggestions!
          </p>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
            onClick={() => setShowDialog(true)}
          >
            Create Feedback
          </button>
        </section>

        {showDialog && renderFeedbackForm()}
      </main>

      <footer className="bg-zinc-800 text-zinc-50 py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 V-Components/UI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
