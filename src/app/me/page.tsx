"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ComponentsCard from "../component/ComponentsCard";
import Link from "next/link";

interface UserProps {
  _id: string;
  name: string;
  email: string;
  components: {
    _id: string;
    ownerId: string;
    codeSnippet?: string;
    componentCode?: string;
    title?: string;
    description?: string;
    componentPath?: string;
    componentsUses?: string;
    liveCode?: React.ReactNode;
    image?: string;
    video?: string;
  }[];
}

const MyProfile = () => {
  const [currentUser, setCurrentUser] = useState<UserProps>();
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get("/api/user/me");
      setCurrentUser(data.user);
    } catch (error) {
      console.error("Error fetching user information:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout");
      setCurrentUser(undefined);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-[80vh] md:p-4  overflow-auto">
      {currentUser ? (
        <div className="flex border-b-[1px] pb-5 border-zinc-700 justify-between items-center">
          <div>
            <h2 className="text-xl py-2">
              Hello, {currentUser.name} welcome to your profile
            </h2>
            <p>Email: {currentUser.email}</p>
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
            No user found please{" "}
            <span className="text-white">sign-in</span> /{" "}
            <span className="text-white">sign-up</span>
          </Link>
      )}
      <div className="flex gap-3 flex-wrap py-10">
        {currentUser?.components?.length ? (
          currentUser.components.map((com) => (
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
            No components found please{" "}
            <span className="text-white">sign-in</span> /{" "}
            <span className="text-white">sign-up</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
