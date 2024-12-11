"use client";
import ComponentsLayout from "@/app/component/ComponentsLayout";
import React, { ReactNode } from "react";

interface TooltipProps {
  content: ReactNode; // Tooltip content, can be any React node (text, element, etc.)
  position?: "top" | "bottom" | "left" | "right"; // Position of the tooltip (default: 'top')
  children: ReactNode; // The element to which the tooltip is attached
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = "top",
  children,
}) => {
  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
    left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
    right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
  };

  return (
    <div className="relative inline-block group">
      {children}
      <div
        className={`absolute min-w-[10rem] z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-zinc-800 text-white text-sm px-2 py-2 rounded-md ${positionClasses[position]}`}
      >
        {content}
      </div>
    </div>
  );
};

const TooltipDemo = () => {
  return (
    <div className="p-5">
      <Tooltip content="This is a tooltip " position="top">
        <button className="px-4 py-2 bg-zinc-500 text-white rounded-md">
          Hover over me
        </button>
      </Tooltip>
    </div>
  );
};

const TooltipComponentLayout = () => {
  const codeSnippet = `
import React, { useState } from "react";
import { Tooltip } from '@/components/tooltip/tooltip';
const TooltipDemo = () => {
  return (
    <div className="p-5">
      <Tooltip content="This is a tooltip " position="top">
        <button className="px-4 py-2 bg-zinc-500 text-white rounded-md">
          Hover over me
        </button>
      </Tooltip>
    </div>
  );
};

export default TooltipDemo;
      `;

  const componentCode = `
// /components/tooltip/tooltip.tsx
      
import React, { ReactNode } from "react";

interface TooltipProps {
  content: ReactNode; // Tooltip content, can be any React node (text, element, etc.)
  position?: "top" | "bottom" | "left" | "right"; // Position of the tooltip (default: 'top')
  children: ReactNode; // The element to which the tooltip is attached
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = "top",
  children,
}) => {
  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
    left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
    right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
  };

  return (
    <div className="relative inline-block group">
      {children}
      <div
        className={\`\absolute min-w-[10rem] z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-zinc-800 text-white text-sm px-2 py-2 rounded-md \${positionClasses[position]}\`}
      >
        {content}
      </div>
    </div>
  );
};

export { Tooltip }
      `;

  return (
    <ComponentsLayout
      componentTitle="Tooltip"
      componentDescription="A versatile tooltip component with support for different positions and content."
      componentsUses="The Tooltip component can be used to display tooltips on hover."
      componentPath="@/components/Tooltip"
      codeSnippet={codeSnippet}
      componentCode={componentCode}
      livePreviewCode={<TooltipDemo />}
    />
  );
};

export default TooltipComponentLayout;
