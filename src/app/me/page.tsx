"use client";

import axios from "axios";
import React from "react";
import ComponentsCard from "../component/ComponentsCard";
import Link from "next/link";
import useUserData from "@/utils/getUserData";

const MyProfile = () => {
  const { user, loading } = useUserData();

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout");
      alert("User logged out successfully");
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[80vh] md:p-6">
      {user ? (
        <>
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row justify-between border-b border-zinc-700 pb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Welcome, <span className="text-zinc-500">{user.name}</span> !
              </h2>
              <p className="text-zinc-400">Email: {user.email}</p>
              <Link
                href="/create-component"
                className="inline-block mt-4 bg-zinc-700 text-white px-4 py-1 rounded-md hover:bg-zinc-800 transition"
              >
                Create Component
              </Link>
            </div>
            <button
              className="mt-4 w-[5rem] self-end md:mt-0 bg-red-400 text-white px-4 py-1 rounded-md hover:bg-red-500 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          {/* User's Components */}
          <div className="py-10">
            <h3 className="text-xl font-semibold mb-4">Your Components</h3>
            <div className="flex flex-wrap gap-3">
              {user.components && user.components.length > 0 ? (
                user.components.map((component) => (
                  <ComponentsCard
                    key={component._id}
                    id={component._id}
                    video={component.video}
                    image={component.image}
                    title={component.title || "Untitled Component"}
                    description={
                      component.description || "No description available"
                    }
                  />
                ))
              ) : (
                <p className="text-zinc-400">
                  No components found. Create one now!
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <p className="text-lg text-zinc-400">
            No user found. Please{" "}
            <Link href="/auth" className="text-blue-500 underline">
              sign in
            </Link>{" "}
            or{" "}
            <Link href="/auth" className="text-blue-500 underline">
              sign up
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
