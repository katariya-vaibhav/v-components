"use client";
import React, { useState } from "react";
import CodeSnippet from "./CodeSnippet";
import Image from "next/image";

interface ComponentsLayoutProps {
  codeSnippet: string;
  componentCode: string;
  componentTitle: string;
  componentDescription: string;
  componentPath: string;
  componentsUses?: string;
  livePreviewCode?: React.ReactNode | null;
  previewImage?: string | null;
  previewVideo?: string | null;
}

const ComponentsLayout: React.FC<ComponentsLayoutProps> = ({
  codeSnippet,
  componentCode,
  componentTitle,
  componentDescription,
  componentPath,
  componentsUses,
  livePreviewCode,
  previewImage,
  previewVideo,
}) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div>
      <h2 className="font-bold text-3xl">{componentTitle}</h2>
      <p className="text-zinc-500 text-md">{componentDescription}</p>

      <div className="my-7">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setShowCode(false)}
            className={`py-2 px-4 ${
              !showCode ? "border-b-[1px] text-white" : "border-b-0"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setShowCode(true)}
            className={`py-2 px-4 ${
              showCode ? "border-b-[1px] text-white" : "border-b-0"
            }`}
          >
            Code
          </button>
        </div>

        <div className="border-[1px] border-zinc-800 text-white rounded-lg w-full">
          <div className="p-4 h-[25rem] overflow-auto scrollbar">
            {showCode ? (
              <CodeSnippet code={codeSnippet} />
            ) : (
              <div className="flex items-center justify-center min-h-full">
                {livePreviewCode ? (
                  <div>{livePreviewCode}</div>
                ) : previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Component Preview"
                    width={500}
                    height={500}
                    layout="intrinsic" 
                    className="rounded-lg"
                  />
                ) : previewVideo ? (
                  <video controls className="rounded-md h-[300px] w-full">
                    <source src={previewVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <p className="text-zinc-400">No preview available</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <h2 className="text-md text-zinc-400 py-2">
        Copy this code and create a new component at{" "}
        <span className="text-zinc-100">{componentPath}</span>
      </h2>
      {componentsUses && (
        <p className="text-md text-zinc-500 mb-4">{componentsUses}</p>
      )}
      <CodeSnippet code={componentCode} />
    </div>
  );
};

export default ComponentsLayout;
