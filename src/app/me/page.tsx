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
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-[80vh] md:p-4  overflow-auto">
      {user ? (
        <div className="flex border-b-[1px] pb-5 border-zinc-700 justify-between items-center">
          <div>
            <h2 className="text-xl py-2">
              Hello, {user.name} welcome to your profile
            </h2>
            <p className="mb-4">Email: {user.email}</p>
            <Link
              href={`/create-component`}
              className="bg-zinc-600 hover:bg-zinc-700 rounded-md py-2 px-3"
            >
              Create component
            </Link>
          </div>
          <div>
            <button
              className="bg-zinc-500 hover:bg-zinc-600 px-3 py-1 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Link href={"/auth"} className="text-zinc-400">
          No user found please <span className="text-white">sign-in</span> /{" "}
          <span className="text-white">sign-up</span>
        </Link>
      )}
      <div className="flex gap-3 flex-wrap py-10">
        {user?.components?.length ? (
          user.components.map((com) => (
            <ComponentsCard
              key={com._id}
              id={com._id}
              video={com.video}
              image={com.image}
              title={com.title || "untitled component"}
              description={com.description || "description not available"}
            />
          ))
        ) : (
          <Link href={"/auth"} className="text-zinc-400">
            No components found
          </Link>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
