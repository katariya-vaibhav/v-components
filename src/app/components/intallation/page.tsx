import CodeSnippet from "@/app/component/CodeSnippet";
import React from "react";
// Adjust the import path as necessary

const InstallationPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Installation</h1>
      <p className="mb-4">
        Follow the steps below to use the components in your project.:
      </p>
      <h2 className="text-xl font-semibold mb-2">
        Step 1: Install the Nextjs App
      </h2>
      <CodeSnippet code="npx create-next-app@latest" />
      <h2 className="text-xl font-semibold mb-2 mt-4">
        Step 2: Install Tailwind css
      </h2>
      <p>Terminal</p>
      <CodeSnippet
        code={`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}
      />
      <p>tailwind.config.js</p>
      <CodeSnippet
        code={`/** @type {import('tailwindcss').Config} \*/
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using \`src\` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`}
      />
      <p>globals.css</p>
      <CodeSnippet
        code={`@tailwind base;
@tailwind components;
@tailwind utilities;`}
      />
      <h2 className="text-xl font-semibold mb-2 mt-4">
        Step 3: Use the components
      </h2>
      <CodeSnippet
        code={`
import React from 'react';
import { Button } from '@/components/Button/Button';

const ButtonDemo = () => {
  return (
    <div>
      <Button variant="primary" size="medium">Primary Button</Button>
    </div>
  );
};

export default ButtonDemo;
`}
      />
    </div>
  );
};

export default InstallationPage;
