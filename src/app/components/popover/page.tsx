"use client";
import ComponentsLayout from "@/app/component/ComponentsLayout";
import React, { useState } from "react";

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  triggerType?: "click" | "hover";
}

const popoverStyles = {
  base: "relative inline-block",
  popoverContent: "absolute w-[10rem] z-10 p-4 bg-gray-800 text-white rounded-md shadow-lg transition-opacity duration-300",
  top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
  left: "top-1/2 right-full transform -translate-y-1/2 mr-2",
  right: "top-1/2 left-full transform -translate-y-1/2 ml-2",
};

const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  position = "top",
  triggerType = "click", // Default to 'click'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle popover for click trigger type
  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  // Show popover on mouse enter for hover trigger type
  const handleMouseEnter = () => {
    if (triggerType === "hover") {
      setIsOpen(true);
    }
  };

  // Hide popover on mouse leave for hover trigger type
  const handleMouseLeave = () => {
    if (triggerType === "hover") {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={popoverStyles.base}
      onClick={triggerType === "click" ? togglePopover : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-haspopup="true"
      aria-expanded={isOpen ? "true" : "false"}
    >
      <div>{trigger}</div>
      {isOpen && (
        <div
          className={`${popoverStyles.popoverContent} ${
            position === "top"
              ? popoverStyles.top
              : position === "bottom"
              ? popoverStyles.bottom
              : position === "left"
              ? popoverStyles.left
              : popoverStyles.right
          }`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

const PopoverDemo = () => {
  return (
    <div className="flex space-x-6">
      {/* Popover with hover trigger */}
      <Popover
        trigger={<button className="p-2 bg-blue-500 text-white rounded-md">Hover Me (Top)</button>}
        content={<div>This is a popover on top (hover)!</div>}
        position="top"
        triggerType="hover"
      />
      <Popover
        trigger={<button className="p-2 bg-green-500 text-white rounded-md">Hover Me (Bottom)</button>}
        content={<div>This is a popover on bottom (hover)!</div>}
        position="bottom"
        triggerType="hover"
      />
      {/* Popover with click trigger */}
      <Popover
        trigger={<button className="p-2 bg-red-500 text-white rounded-md">Click Me (Left)</button>}
        content={<div>This is a popover on the left (click)!</div>}
        position="left"
        triggerType="click"
      />
      <Popover
        trigger={<button className="p-2 bg-purple-500 text-white rounded-md">Click Me (Right)</button>}
        content={<div>This is a popover on the right (click)!</div>}
        position="right"
        triggerType="click"
      />
    </div>
  );
};

const PopoverComponentLayout = () => {
  const codeSnippet = `
import React from "react";
import {Popover} from "@/components/Popover/Popover";

const PopoverDemo = () => {
  return (
    <div className="flex space-x-6">
      {/* Popover with hover trigger */}
      <Popover
        trigger={<button className="p-2 bg-blue-500 text-white rounded-md">Hover Me (Top)</button>}
        content={<div>This is a popover on top (hover)!</div>}
        position="top"
        triggerType="hover"
      />
      <Popover
        trigger={<button className="p-2 bg-green-500 text-white rounded-md">Hover Me (Bottom)</button>}
        content={<div>This is a popover on bottom (hover)!</div>}
        position="bottom"
        triggerType="hover"
      />
      {/* Popover with click trigger */}
      <Popover
        trigger={<button className="p-2 bg-red-500 text-white rounded-md">Click Me (Left)</button>}
        content={<div>This is a popover on the left (click)!</div>}
        position="left"
        triggerType="click"
      />
      <Popover
        trigger={<button className="p-2 bg-purple-500 text-white rounded-md">Click Me (Right)</button>}
        content={<div>This is a popover on the right (click)!</div>}
        position="right"
        triggerType="click"
      />
    </div>
  );
};
export default PopoverDemo;
`;

  const componentCode = `
//@/components/Popover/Popover.tsx

"use client";

import React, { useState } from "react";

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  triggerType?: "click" | "hover";
}

const popoverStyles = {
  base: "relative inline-block",
  popoverContent: "absolute w-[10rem] z-10 p-4 bg-gray-800 text-white rounded-md shadow-lg transition-opacity duration-300",
  top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
  left: "top-1/2 right-full transform -translate-y-1/2 mr-2",
  right: "top-1/2 left-full transform -translate-y-1/2 ml-2",
};

const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  position = "top",
  triggerType = "click", // Default to 'click'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle popover for click trigger type
  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  // Show popover on mouse enter for hover trigger type
  const handleMouseEnter = () => {
    if (triggerType === "hover") {
      setIsOpen(true);
    }
  };

  // Hide popover on mouse leave for hover trigger type
  const handleMouseLeave = () => {
    if (triggerType === "hover") {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={popoverStyles.base}
      onClick={triggerType === "click" ? togglePopover : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-haspopup="true"
      aria-expanded={isOpen ? "true" : "false"}
    >
      <div>{trigger}</div>
      {isOpen && (
        <div
          className={\`\${popoverStyles.popoverContent} \${
            position === "top"
              ? popoverStyles.top
              : position === "bottom"
              ? popoverStyles.bottom
              : position === "left"
              ? popoverStyles.left
              : popoverStyles.right
          }\`}
        >
          {content}
        </div>
      )}
    </div>
  );
};
export {Popover}
`;

  return (
    <ComponentsLayout
      componentTitle="Popover"
      componentDescription="A popover component that displays content when clicked or hovered. The position of the popover can be customized."
      codeSnippet={codeSnippet}
      componentCode={componentCode}
      componentPath="@/components/Popover"
      componentsUses="Popover component is useful for showing extra information, tooltips, or actions when the user clicks or hovers over an element."
      livePreviewCode={<PopoverDemo />}
    />
  );
};

export default PopoverComponentLayout;
