"use client";

import ComponentsLayout from "@/app/component/ComponentsLayout";
import React, { useState } from "react";

interface SliderProps {
  min?: number; // Minimum value of the slider
  max?: number; // Maximum value of the slider
  step?: number; // Step size for the slider
  value: number; // Current value of the slider
  onChange: (value: number) => void; // Callback for when the slider value changes
  disabled?: boolean; // Disable the slider
  label?: string; // Optional label for accessibility
}

const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  disabled = false,
  label = "Slider",
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  const progressWidth = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col w-[15rem]">
      {label && (
        <label
          htmlFor="slider"
          className="mb-2 text-sm font-medium text-zinc-700"
        >
          {label}
        </label>
      )}
      <div className="relative w-full h-2 bg-zinc-300 rounded-full">
        {/* Progress Bar */}
        <div
          className="absolute top-0 left-0 h-2 bg-zinc-500 rounded-full transition-all"
          style={{ width: `${progressWidth}%` }}
        ></div>

        {/* Input Range */}
        <input
          id="slider"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          className="absolute top-0 left-0 w-full h-2 opacity-0 appearance-none"
        />

        {/* Custom Thumb */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 transform bg-zinc-900 rounded-full border-2 border-white shadow-md transition-all ${
            disabled ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer"
          }`}
          style={{
            left: `${progressWidth}%`,
            width: "1.25rem",
            height: "1.25rem",
          }}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-sm text-zinc-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};
// ---

const SliderDemo = () => {
  const [value, setValue] = useState(50);

  return (
    <div className="p-6 space-y-8">
      {/* Default Slider */}
      <div>
        <p className="mb-1 text-zinc-500">Default Slider</p>
        <Slider min={0} max={100} step={0} value={value} onChange={setValue} />
        <p className="mt-2 text-sm">
          Selected Value: <strong>{value}</strong>
        </p>
      </div>

      {/* Disabled Slider */}
      <div>
        <p className="mb-1 text-zinc-500">Disabled Slider</p>
        <Slider
          min={0}
          max={50}
          step={5}
          value={20}
          onChange={() => {}}
          disabled
        />
        <p className="mt-2 text-sm text-gray-500">This slider is disabled.</p>
      </div>
    </div>
  );
};

const SliderComponentLayout = () => {
  const codeSnippet = `
import React, { useState } from "react";
import { Slider } from '@/components/slider/slider';
const SliderDemo = () => {
  const [value, setValue] = useState(50);

  return (
    <div className="p-6 space-y-8">

      {/* Default Slider */}
      <div>
        <p className="mb-1 text-zinc-500">Default Slider</p>
        <Slider min={0} max={100} step={0} value={value} onChange={setValue} />
        <p className="mt-2 text-sm">
          Selected Value: <strong>{value}</strong>
        </p>
      </div>

      {/* Disabled Slider */}
      <div>
        <p className="mb-1 text-zinc-500">Disabled Slider</p>
        <Slider
          min={0}
          max={50}
          step={5}
          value={20}
          onChange={() => {}}
          disabled
        />
        <p className="mt-2 text-sm text-gray-500">This slider is disabled.</p>
      </div>
    </div>
  );
};

export default SliderDemo;
`;

  const componentCode = `
// /components/slider/slider.tsx

import React, { useState } from "react";

interface SliderProps {
  min?: number; // Minimum value of the slider
  max?: number; // Maximum value of the slider
  step?: number; // Step size for the slider
  value: number; // Current value of the slider
  onChange: (value: number) => void; // Callback for when the slider value changes
  disabled?: boolean; // Disable the slider
  label?: string; // Optional label for accessibility
}

const Slider: React.FC<SliderProps> = ({
    min = 0,
    max = 100,
    step = 1,
    value,
    onChange,
    disabled = false,
    label = "Slider",
  }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      onChange(newValue);
    };
  
    const progressWidth = ((value - min) / (max - min)) * 100;
  
    return (
      <div className="flex flex-col w-[15rem]">
        {label && (
          <label
            htmlFor="slider"
            className="mb-2 text-sm font-medium text-zinc-700"
          >
            {label}
          </label>
        )}
        <div className="relative w-full h-2 bg-zinc-300 rounded-full">
          {/* Progress Bar */}
          <div
            className="absolute top-0 left-0 h-2 bg-zinc-500 rounded-full transition-all"
            style={{ width: \`\${progressWidth}% \` }}
          ></div>
  
          {/* Input Range */}
          <input
            id="slider"
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            className="absolute top-0 left-0 w-full h-2 opacity-0 appearance-none"
          />
  
          {/* Custom Thumb */}
          <div
            className={\`\absolute top-1/2 -translate-y-1/2 transform bg-zinc-900 rounded-full border-2 border-white shadow-md transition-all \${
              disabled ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer"
            }\`}
            style={{
              left: \`\${progressWidth}% \`,
              width: "1.25rem",
              height: "1.25rem",
            }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-zinc-500">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    );
  };
export { Slider }
`;

  return (
    <ComponentsLayout
      componentTitle="Slider"
      componentDescription="A customizable Slider component that allows users to select a value from a range."
      codeSnippet={codeSnippet}
      componentCode={componentCode}
      livePreviewCode={<SliderDemo />}
      componentsUses="Slider is a useful component for selecting a value from a range."
      componentPath="@/components/Slider"
    />
  );
};

export default SliderComponentLayout;
