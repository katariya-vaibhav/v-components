"use client";

import ComponentsLayout from "@/app/component/ComponentsLayout";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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

const ComponentPage = () => {
  const { slug } = useParams();

  const [components, setComponents] = useState<ComponentsProps>();

  const fetchComponents = async () => {
    try {
      const { data } = await axios.get(
        `/api/component/get-component?id=${slug}`
      );
      setComponents(data.components || []);
    } catch (error) {
      console.error("Error fetching components:", error);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, []);


  return (
    <div className="md:p-4">
      {components ? (
        <ComponentsLayout
          codeSnippet={components.codeSnippet || "No code snippet available"}
          componentCode={
            components.componentCode || "No component code provided"
          }
          componentTitle={components.componentTitle || "Untitled Component"}
          componentDescription={
            components.description || "No description available"
          }
          componentPath={
            components.componentPath || "src/components/UntitledComponent.tsx"
          }
          componentsUses={
            components.componentsUses || "No usage information provided"
          }
          livePreviewCode={components.liveCode || null}
          previewImage={components.image || null}
          previewVideo={components.video || null}
        />
      ) : (
        <p className="text-zinc-500">No components found.</p>
      )}
    </div>
  );
};

export default ComponentPage;
