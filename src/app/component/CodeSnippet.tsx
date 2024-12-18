"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
type CodeSnippetProps = {
  code: string;
};
const CodeSnippet: React.FC<CodeSnippetProps> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className="relative bg-zinc-950 overflow-auto scrollbar rounded-lg">
      <SyntaxHighlighter language="typescript" style={atomDark}>
        {code}
      </SyntaxHighlighter>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-zinc-500 hover:bg-zinc-600 text-white px-2 py-1 rounded"
      >
        {isCopied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CodeSnippet;
