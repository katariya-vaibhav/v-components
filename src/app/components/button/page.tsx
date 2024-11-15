"use client";
import React from "react";
import ComponentsLayout from "@/app/component/ComponentsLayout";

type ButtonVariant = "primary" | "secondary" | "success" | "danger" | "link";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const buttonStyles = {
  base: "inline-flex items-center justify-center font-semibold text-sm transition-all duration-200 focus:outline-none",
  sizes: {
    small: "px-3 py-1.5 text-xs",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  },
  variants: {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300",
    secondary:
      "bg-gray-600 text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-300",
    success:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-300",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300",
    link: "bg-transparent text-blue-600 hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 border-none",
  },
  disabled: "cursor-not-allowed opacity-50",
  spinner:
    "animate-spin border-4 border-t-4 border-transparent rounded-full w-6 h-6",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  loading = false,
}) => {
  const buttonClassName = `
    ${buttonStyles.base}
    ${buttonStyles.sizes[size]}
    ${buttonStyles.variants[variant]}
    ${disabled && buttonStyles.disabled}
  `;

  return (
    <button
      onClick={onClick}
      className={buttonClassName}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <svg
            className={buttonStyles.spinner}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 101"
            fill="none"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            />
          </svg>
          <span>{children}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

// Demo Component for Button
const ButtonDemo = () => {
  return (
    <div className="space-y-4 flex flex-col">
      <Button variant="primary" size="medium">
        Primary Button
      </Button>
      <Button variant="secondary" size="medium">
        Secondary Button
      </Button>
      <Button variant="success" size="large">
        Success Button
      </Button>
      <Button variant="danger" size="small">
        Danger Button
      </Button>
      <Button variant="link" size="medium" disabled>
        Link Button
      </Button>
      <Button variant="primary" size="medium" disabled loading>
        Loading Button
      </Button>
    </div>
  );
};

// Main Component with ComponentsLayout Wrapper
const ButtonComponentLayout = () => {
  const codeSnippet = `
import React from 'react';
import { Button } from '@/components/Button';

const ButtonDemo = () => {
  return (
    <div>
      <Button variant="primary" size="medium">Primary Button</Button>
      <Button variant="secondary" size="medium">Secondary Button</Button>
      <Button variant="success" size="large">Success Button</Button>
      <Button variant="danger" size="small">Danger Button</Button>
      <Button variant="link" size="medium" disabled>Link Button</Button>
      <Button variant="primary" size="medium" disabled loading>Loading Button</Button>
    </div>
  );
};

export default ButtonDemo;
`;

  const componentCode = `
//@/components/Button/Button.tsx

import React from 'react';

type ButtonVariant = "primary" | "secondary" | "success" | "danger" | "link";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const buttonStyles = {
  base: "inline-flex items-center justify-center font-semibold text-sm transition-all duration-200 focus:outline-none",
  sizes: {
    small: "px-3 py-1.5 text-xs",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  },
  variants: {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-300",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300",
    link: "bg-transparent text-blue-600 hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 border-none",
  },
  disabled: "cursor-not-allowed opacity-50",
  spinner: "animate-spin border-4 border-t-4 border-transparent rounded-full w-6 h-6",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  loading = false,
}) => {
  const buttonClassName = \`
    \${buttonStyles.base}
    \${buttonStyles.sizes[size]}
    \${buttonStyles.variants[variant]}
    \${disabled && buttonStyles.disabled}
  \`;

  return (
    <button
      onClick={onClick}
      className={buttonClassName}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <svg
            className={buttonStyles.spinner}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 101"
            fill="none"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            />
          </svg>
          <span>{children}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export { Button };
`;

  return (
    <ComponentsLayout
      componentTitle="Button"
      componentDescription="A versatile button component with support for various styles, sizes, and loading states."
      codeSnippet={codeSnippet}
      componentCode={componentCode}
      componentPath="@/components/Button"
      componentsUses="The Button component can handle multiple styles and sizes, and includes support for loading states and disabled buttons."
      livePreviewCode={<ButtonDemo />}
    />
  );
};

export default ButtonComponentLayout;