"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ComponentsLayout from "../component/ComponentsLayout";

interface ComponentsProps {
  _id: string;
  codeSnippet?: string;
  componentCode?: string;
  componentTitle?: string;
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Components</h2>
      {allComponents.length > 0 ? (
        allComponents.map((com: ComponentsProps) => (
          <ComponentsLayout
            key={com._id}
            codeSnippet={com.codeSnippet || "No code snippet available"}
            componentCode={com.componentCode || "No component code provided"}
            componentTitle={com.componentTitle || "Untitled Component"}
            componentDescription={com.description || "No description available"}
            componentPath={
              com.componentPath || "src/components/UntitledComponent.tsx"
            }
            componentsUses={
              com.componentsUses || "No usage information provided"
            }
            livePreviewCode={com.liveCode || null}
            previewImage={com.image || null}
            previewVideo={com.video || null}
          />
        ))
      ) : (
        <p className="text-zinc-500">No components found.</p>
      )}
    </div>
  );
};

export default Page;
