"use client";
import CodeSnippet from "@/app/component/CodeSnippet";
import React, { useState } from "react";

// Main Alert Component
const Alert = () => {
  const [showCode, setShowCode] = useState(false);

  const codeSnippet = `
import React from 'react';
import { AlertBody } from '@/components/alert';

const AlertDemo = () => (
  <div className="flex items-center justify-center h-full">
    <AlertBody
      alertTitle="Heads up!"
      alertDescription="You can add components to your app using the CLI."
      type="error"
    />
  </div>
);

export default AlertDemo;
`;

  const componentCode = `
//@/components/alert/page.tsx

import React from 'react';

type AlertType = "success" | "warning" | "error" | "info";

interface AlertProps {
  type?: AlertType;
  alertTitle: string;
  alertDescription: string;
}

const alertStyles: Record<AlertType | "base", string> = {
  base: "p-4 rounded-md flex items-center gap-3 shadow-md",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
};

// Alert Body Component
const AlertBody: React.FC<AlertProps> = ({
  type = "info",
  alertTitle,
  alertDescription,
}) => {
  const alertTypeStyle = alertStyles[type] || alertStyles.info;
  return (
    <div className={\`\${alertStyles.base} \${alertTypeStyle}\`}>
      <AlertIcon />
      <div>
        <AlertTitle>{alertTitle}</AlertTitle>
        <AlertDescription>{alertDescription}</AlertDescription>
      </div>
    </div>
  );
};

// Alert Subcomponents
const AlertDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm">{children}</div>
);

const AlertTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="font-semibold">{children}</div>
);

const AlertIcon = () => <span className="mr-2 text-lg">⚠️</span>;

export { AlertIcon, AlertTitle, AlertDescription, AlertBody };
`;

  return (
    <div>
      <h2 className="font-bold text-3xl">Alert</h2>
      <p className="text-zinc-500 text-md">
        Displays a callout for user attention.
      </p>

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
              <div className="flex items-center justify-center h-full">
                <AlertBody
                  alertTitle="Heads up!"
                  alertDescription="You can add components to your app using the CLI."
                  type="error"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <h2 className="text-md text-zinc-400 py-2">
        Copy this code and create a new component at{" "}
        <span className="text-zinc-100">@/components/alert</span>
      </h2>
      <p className="text-md text-zinc-500 mb-4">
        The `Alert` component provides a customizable way to display
        notifications or important information to users with pre-configured
        styles for different alert types. Each alert type (e.g., success,
        warning, error, info) is styled uniquely to convey the nature of the
        message visually.
      </p>
      <CodeSnippet code={componentCode} />
    </div>
  );
};

export default Alert;

// Component Definitions
type AlertType = "success" | "warning" | "error" | "info";

interface AlertProps {
  type?: AlertType;
  alertTitle: string;
  alertDescription: string;
}

const alertStyles: Record<AlertType | "base", string> = {
  base: "p-4 rounded-md flex items-center gap-3 shadow-md",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
};

const AlertBody: React.FC<AlertProps> = ({
  type = "info",
  alertTitle,
  alertDescription,
}) => {
  const alertTypeStyle = alertStyles[type] || alertStyles.info;
  return (
    <div className={`${alertStyles.base} ${alertTypeStyle}`}>
      <AlertIcon />
      <div>
        <AlertTitle>{alertTitle}</AlertTitle>
        <AlertDescription>{alertDescription}</AlertDescription>
      </div>
    </div>
  );
};

const AlertDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm">{children}</div>
);

const AlertTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="font-semibold">{children}</div>
);

const AlertIcon = () => <span className="mr-2 text-lg">⚠️</span>;

export { AlertIcon, AlertTitle, AlertDescription, AlertBody };
