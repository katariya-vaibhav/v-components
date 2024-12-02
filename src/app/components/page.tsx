"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ComponentsCard from "../component/ComponentsCard";

interface ComponentsProps {
  _id: string;
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

const Page = () => {
  const [allComponents, setAllComponents] = useState<ComponentsProps[]>([]);

  const fetchComponents = async () => {
    try {
      const { data } = await axios.get("/api/component/all-component");
      setAllComponents(data.components || []);
    } catch (error) {
      console.error("Error fetching components:", error);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  return (
    <div className="md:p-4 w-full min-h-full">
      <h2 className="text-2xl font-bold mb-4">Users Components</h2>
      <div className="flex gap-3 flex-wrap">
        {allComponents.length > 0 ? (
          allComponents.map((com: ComponentsProps) => (
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
          <p className="text-zinc-500">No components found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
