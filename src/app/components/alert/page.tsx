"use client";
import ComponentsLayout from "@/app/component/ComponentsLayout";
import React from "react";

// Main Alert Component
const Alert = () => {
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
      <ComponentsLayout
        componentTitle="Alert"
        componentDescription="Displays a callout for user attention."
        codeSnippet={codeSnippet}
        componentCode={componentCode}
        componentPath="@/components/alert"
        componentsUses=" The `Alert` component provides a customizable way to display notifications or important information to users with pre-configured styles for different alert types. Each alert type (e.g., success, warning, error, info) is styled uniquely to convey the nature of the message visually."
        livePreviewCode={
          <AlertBody
            alertTitle="Heads up!"
            alertDescription="You can add components to your app using the CLI."
            type="error"
          />
        }
      />
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
