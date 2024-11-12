"use client";
import CodeSnippet from "@/app/component/CodeSnippet";
import React, { useState } from "react";

const Alert = () => {
  const [showCode, setShowCode] = useState(false);

  const codeSnippet = `
import React from 'react';
import {AlertIcon , AlertTitle , AlertDescription} from '@/components/alert';

const AlertBody = () => (
  <div className="flex items-start bg-zinc-800 p-4 rounded-lg">
    <AlertIcon />
    <div>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </div>
  </div>
);

export default AlertBody;
`;

  const componentCode = `
import React from 'react';

const AlertDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm text-gray-300">{children}</div>
);

const AlertTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="font-semibold">{children}</div>
);

const AlertIcon = () => (
  <span className="mr-2 text-lg">⚠️</span>
);

const Alert = () => (
  <div className="flex items-start bg-zinc-800 p-4 rounded-lg">
    <AlertIcon />
    <div>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </div>
  </div>
);

export {AlertIcon , AlertTitle , AlertDescription , Alert}

`;

  return (
    <div>
      <div>
        <h2 className="font-bold text-3xl">Alert</h2>
        <p className="text-zinc-500 text-md">
          Displays a callout for user attention.
        </p>
      </div>

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
              <div className="flex  items-center justify-center h-full">
                <AlertBody />
              </div>
            )}
          </div>
        </div>
      </div>
      <h2 className="text-lg">@/components/alert</h2>
      <CodeSnippet code={componentCode} />
    </div>
  );
};

export default Alert;

const AlertDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm text-gray-300">{children}</div>
);

const AlertTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="font-semibold">{children}</div>
);

const AlertIcon = () => <span className="mr-2 text-lg">⚠️</span>;

export { AlertIcon, AlertTitle, AlertDescription };
const AlertBody = () => (
  <div className="flex items-start bg-zinc-800 p-4 rounded-lg">
    <AlertIcon />
    <div>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </div>
  </div>
);
