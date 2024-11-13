"use client";
import React, { useState } from "react";
import CodeSnippet from "./CodeSnippet";

interface ComponentsLayoutProps {
  codeSnippet: string;
  componentCode: string;
  componentTitle: string;
  componentDescription: string;
  componentPath: string;
  componentsUses?: string;
  livePreviewCode: React.ReactNode;
}
const ComponentsLayout: React.FC<ComponentsLayoutProps> = ({
  codeSnippet,
  componentCode,
  componentTitle,
  componentDescription,
  componentPath,
  componentsUses,
  livePreviewCode,
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
          <div className="p-4 h-[20rem] overflow-auto scrollbar">
            {showCode ? (
              <CodeSnippet code={codeSnippet} />
            ) : (
              <div className="flex items-center justify-center min-h-full">
                {livePreviewCode}
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
