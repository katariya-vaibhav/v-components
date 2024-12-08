"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReviewCard } from "./component/ReviewCard";

export default function Home() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const [reviews, setReviews] = useState([
    {
      id: 1,
      username: "John Doe",
      feedback: "Great library! Highly recommend.",
    },
    {
      id: 2,
      username: "Jane Smith",
      feedback: "Very customizable and intuitive.",
    },
  ]);

  const handleDelete = (id: number) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get("/api/user/me");
        if (response.status === 200) {
          setIsUserSignedIn(true);
        } else {
          setIsUserSignedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsUserSignedIn(false);
      }
    }
    fetchUser();
  }, []);

  const handleFeedbackSubmit = async () => {
    if (!isUserSignedIn) {
      router.push("/auth");
      return;
    }

    try {
      const res = await axios.post("/api/feedback/create-feedback", {
        feedback,
      });
      console.log(res.data);

      console.log("Feedback submitted:", feedback);
      setFeedback("");
      setShowDialog(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="bg-zinc-900 text-zinc-50 font-sans">
      <main className="container mx-auto px-6 py-10">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Welcome to V-Components/UI
          </h2>
          <p className="text-lg text-zinc-300">
            Build stunning interfaces with our highly customizable and intuitive
            components.
          </p>
        </section>

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
          <div className="flex flex-wrap gap-4 p-6">
            {reviews.map((review) => (
              <SwiperSlide>
                <ReviewCard
                  key={review.id}
                  username={review.username}
                  feedback={review.feedback}
                  onDelete={() => handleDelete(review.id)}
                />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>

        <section className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">Your Feedback Matters</h3>
          <p className="text-zinc-300 mb-6">
            Help us make V-Components/UI even better. Share your thoughts and
            suggestions!
          </p>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
            aria-label="Create Feedback"
            onClick={() => setShowDialog(true)}
          >
            Create Feedback
          </button>
        </section>

        {showDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-bold text-zinc-50 mb-4">
                Submit Feedback
              </h3>
              <textarea
                className="w-full p-3 bg-zinc-700 text-zinc-50 rounded-lg mb-4 resize-none"
                rows={4}
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  onClick={() => setShowDialog(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={handleFeedbackSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-zinc-800 text-zinc-50 py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 V-Components/UI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
