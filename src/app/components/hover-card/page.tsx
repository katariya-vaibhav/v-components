"use client";
import React from "react";
import ComponentsLayout from "@/app/component/ComponentsLayout";

interface HoverCardProps {
  content: string;
  hoverContent: string;
  hoverTitle: string;
  hoverLink?: string;
  hoverLinkTitle?: string;
}

const hoverCardStyles = {
  base: "relative group inline-block",

  body: "p-3 bg-gray-950 min-w-[15rem] text-white rounded-md shadow-md transition-opacity duration-300 opacity-0 invisible absolute z-10 group-hover:opacity-100 group-hover:visible border-zinc-800 border",
  hoverTitle: "text-lg my-1 text-zinc-200",
  hoverDescription: "text-sm text-zinc-400",
  hoverLink: "text-sm mt-4 hover:border-b-[1px] text-zinc-300",
};

const HoverCard: React.FC<HoverCardProps> = ({
  content,
  hoverContent,
  hoverTitle,
  hoverLink,
  hoverLinkTitle = "Link",
}) => {
  return (
    <div className={hoverCardStyles.base}>
      <div className="border-b-[1px]">{content}</div>
      <div className={`${hoverCardStyles.body}`}>
        <h2 className={`${hoverCardStyles.hoverTitle}`}>{hoverTitle}</h2>
        <p className={`${hoverCardStyles.hoverDescription}`}>{hoverContent}</p>
        <a
          href={hoverLink}
          target="_blank"
          className={`${hoverCardStyles.hoverLink}`}
        >
          {hoverLinkTitle}
        </a>
      </div>
    </div>
  );
};

// Demo Component for HoverCard
const HoverCardDemo = () => {
  return (
    <div className="flex flex-col space-y-6">
      <HoverCard
        content="hello"
        hoverContent="this is hover card this is hover card this is hover card this is hover card this is hover card this is hover card"
        hoverTitle="Hover Card Title"
        hoverLink="https://github.com/vaibhav-katariya/v-components"
        hoverLinkTitle="GitHub"
      />
    </div>
  );
};

// Main Component with ComponentsLayout Wrapper
const HoverCardComponentLayout = () => {
  const codeSnippet = `
import React from 'react';
import { HoverCard } from "@/components/HoverCard/HoverCard"

const HoverCardDemo = () => {
  return (
      <HoverCard
        content="hello"
        hoverContent="this is hover card this is hover card this is hover card this is hover card this is hover card this is hover card"
        hoverTitle="Hover Card Title"
        hoverLink="https://github.com/vaibhav-katariya/v-components"
        hoverLinkTitle="GitHub"
      />
  );
};

export default HoverCardDemo
`;

  const componentCode = `
//@/components/HoverCard/HoverCard.tsx

import React from "react";

interface HoverCardProps {
  content: string;
  hoverContent: string;
  hoverTitle: string;
  hoverLink?: string;
  hoverLinkTitle?: string;
}

const hoverCardStyles = {
  base: "relative group inline-block",
  body: "p-3 bg-gray-950 min-w-[15rem] text-white rounded-md shadow-md transition-opacity duration-300 opacity-0 invisible absolute z-10 group-hover:opacity-100 group-hover:visible border-zinc-800 border",
  hoverTitle: "text-lg my-1 text-zinc-200",
  hoverDescription: "text-sm text-zinc-400",
  hoverLink: "text-sm mt-4 hover:border-b-[1px] text-zinc-300",
};

const HoverCard: React.FC<HoverCardProps> = ({
  content,
  hoverContent,
  hoverTitle,
  hoverLink,
  hoverLinkTitle = "Link",
}) => {
  return (
    <div className={hoverCardStyles.base}>
      <div className="border-b-[1px]">{content}</div>
      <div className={\`\${hoverCardStyles.body}\`}>
        <h2 className={\`\${hoverCardStyles.hoverTitle}\`}>{hoverTitle}</h2>
        <p className={\`\${hoverCardStyles.hoverDescription}\`}>{hoverContent}</p>
        <a href={hoverLink} target="_blank" className={\`\${hoverCardStyles.hoverLink}\`}>
          {hoverLinkTitle}
        </a>
      </div>
    </div>
  );
};

export { HoverCard };
`;

  return (
    <ComponentsLayout
      componentTitle="Hover Card"
      componentDescription="A dark-themed hover card component with flexible alignment and user-friendly customization."
      codeSnippet={codeSnippet}
      componentCode={componentCode}
      componentPath="@/components/HoverCard"
      componentsUses="The HoverCard component provides an interactive way to show additional information on hover, ideal for tooltips or extra details."
      livePreviewCode={<HoverCardDemo />}
    />
  );
};

export default HoverCardComponentLayout;
