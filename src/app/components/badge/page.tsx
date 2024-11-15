"use client";
import React from "react";
import ComponentsLayout from "@/app/component/ComponentsLayout";

type BadgeVariant = "primary" | "secondary" | "success" | "warning" | "error";

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  pill?: boolean;
}

const badgeStyles = {
  base: "inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium",
  variants: {
    primary: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  },
  pill: "rounded-full px-3 py-1",
};

const Badge: React.FC<BadgeProps> = ({ text, variant = "primary", pill = false }) => {
  const badgeClassName = `
    ${badgeStyles.base}
    ${badgeStyles.variants[variant]}
    ${pill ? badgeStyles.pill : ""}
  `;
  
  return <span className={badgeClassName}>{text}</span>;
};

// Demo Component for Badge
const BadgeDemo = () => {
  return (
    <div className="space-y-4 flex flex-col">
      <Badge text="Primary Badge" variant="primary" />
      <Badge text="Secondary Badge" variant="secondary" />
      <Badge text="Success Badge" variant="success" pill />
      <Badge text="Warning Badge" variant="warning" />
      <Badge text="Error Badge" variant="error" pill />
    </div>
  );
};

// Main Component with ComponentsLayout Wrapper
const BadgeComponentLayout = () => {
  const codeSnippet = `
import React from 'react';
import { Badge } from '@/components/Badge';

const BadgeDemo = () => {
  return (
    <div>
      <Badge text="Primary Badge" variant="primary" />
      <Badge text="Secondary Badge" variant="secondary" />
      <Badge text="Success Badge" variant="success" pill />
      <Badge text="Warning Badge" variant="warning" />
      <Badge text="Error Badge" variant="error" pill />
    </div>
  );
};

export default BadgeDemo;
`;

  const componentCode = `
//@/components/Badge/Badge.tsx

import React from 'react';

type BadgeVariant = "primary" | "secondary" | "success" | "warning" | "error";

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  pill?: boolean;
}

const badgeStyles = {
  base: "inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium",
  variants: {
    primary: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  },
  pill: "rounded-full px-3 py-1",
};

const Badge: React.FC<BadgeProps> = ({ text, variant = "primary", pill = false }) => {
  const badgeClassName = \`
    \${badgeStyles.base}
    \${badgeStyles.variants[variant]}
    \${pill ? badgeStyles.pill : ""}
  \`;

  return <span className={badgeClassName}>{text}</span>;
};

export { Badge };
`;

  return (
    <ComponentsLayout
      componentTitle="Badge"
      componentDescription="A versatile badge component with support for different colors and pill shape."
      codeSnippet={codeSnippet}
      componentCode={componentCode}
      componentPath="@/components/Badge"
      componentsUses="The Badge component can be used for tags, statuses, and notifications in various styles."
      livePreviewCode={<BadgeDemo />}
    />
  );
};

export default BadgeComponentLayout;
