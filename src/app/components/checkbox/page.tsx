"use client";
import React, { useState } from "react";
import ComponentsLayout from "@/app/component/ComponentsLayout";

interface CheckboxProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const checkboxStyles = {
  base: "mr-2 cursor-pointer",
  label: "font-semibold",
  helperText: "text-sm text-gray-500",
  errorText: "text-sm text-red-500",
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  helperText,
  errorText,
  checked,
  onChange,
}) => {
  const hasError = Boolean(errorText);

  return (
    <div className="flex flex-col mb-4">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={checkboxStyles.base}
        />
        {label && <span className={checkboxStyles.label}>{label}</span>}
      </label>
      {helperText && !hasError && (
        <span className={checkboxStyles.helperText}>{helperText}</span>
      )}
      {hasError && <span className={checkboxStyles.errorText}>{errorText}</span>}
    </div>
  );
};

// Demo Component for Checkbox
const CheckboxDemo = () => {
  const [termsChecked, setTermsChecked] = useState(false);

  return (
    <div className="space-y-4">
      <Checkbox
        label="Accept Terms and Conditions"
        checked={termsChecked}
        onChange={(e) => setTermsChecked(e.target.checked)}
        helperText="Please accept terms to proceed."
        errorText={!termsChecked ? "You must accept the terms." : ""}
      />
    </div>
  );
};

// Main Component with ComponentsLayout Wrapper
const CheckboxComponentLayout = () => {
  const codeSnippet = `
import React, { useState } from 'react';
import { Checkbox } from '@/components/Checkbox';

const CheckboxDemo = () => {
  const [termsChecked, setTermsChecked] = useState(false);

  return (
    <Checkbox
      label="Accept Terms and Conditions"
      checked={termsChecked}
      onChange={(e) => setTermsChecked(e.target.checked)}
      helperText="Please accept terms to proceed."
      errorText={!termsChecked ? "You must accept the terms." : ""}
    />
  );
};

export default CheckboxDemo;
`;

  const componentCode = `
//@/components/Checkbox/Checkbox.tsx

import React from 'react';

interface CheckboxProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const checkboxStyles = {
  base: "mr-2 cursor-pointer",
  label: "font-semibold",
  helperText: "text-sm text-gray-500",
  errorText: "text-sm text-red-500",
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  helperText,
  errorText,
  checked,
  onChange,
}) => {
  const hasError = Boolean(errorText);

  return (
    <div className="flex flex-col mb-4">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={checkboxStyles.base}
        />
        {label && <span className={checkboxStyles.label}>{label}</span>}
      </label>
      {helperText && !hasError && (
        <span className={checkboxStyles.helperText}>{helperText}</span>
      )}
      {hasError && <span className={checkboxStyles.errorText}>{errorText}</span>}
    </div>
  );
};

export { Checkbox };
`;

  return (
    <ComponentsLayout
      componentTitle="Checkbox"
      componentDescription="A checkbox component with support for labels, helper text, and validation error messages."
      codeSnippet={codeSnippet}
      componentCode={componentCode}
      componentPath="@/components/Checkbox"
      componentsUses="This checkbox component can display a label, helper text, and error messages for validation."
      livePreviewCode={<CheckboxDemo />}
    />
  );
};

export default CheckboxComponentLayout;

