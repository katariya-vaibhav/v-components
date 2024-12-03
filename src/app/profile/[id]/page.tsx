"use client";

import ComponentsCard from "@/app/component/ComponentsCard";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ComponentProps {
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
}

interface UserProps {
  _id: string;
  name: string;
  email: string;
  components: ComponentProps[];
}

const UserProfile = () => {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get(`/api/user/get-user?id=${id}`);
      setCurrentUser(data.user);
    } catch (error) {
      console.error("Error fetching user information:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchCurrentUser();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>User not found</div>;
  }

  return (
    <div className="w-full min-h-[80vh] md:p-4 overflow-auto">
      <div className="flex border-b-[1px] pb-5 border-zinc-700 justify-between items-center">
        <div>
          <h2 className="text-xl py-2">
            Name: {currentUser.name}
          </h2>
          <p>Email: {currentUser.email}</p>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap py-10">
        {currentUser.components.length > 0 ? (
          currentUser.components.map((com) => (
            <ComponentsCard
              key={com._id}
              id={com._id}
              video={com.video}
              image={com.image}
              title={com.title || "Untitled Component"}
              description={com.description || "No description available"}
            />
          ))
        ) : (
          <p>No components found</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
