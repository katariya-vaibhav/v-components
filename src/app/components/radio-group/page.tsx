"use client";

import ComponentsLayout from "@/app/component/ComponentsLayout";
import React, { useState } from "react";

interface RadioGroupOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioGroupOption[]; // Array of radio options
  name: string; // Name for the radio group
  selectedValue?: string; // Initially selected value
  onChange?: (value: string) => void; // Callback when the selected value changes
  direction?: "horizontal" | "vertical"; // Orientation of radio buttons
}

const radioStyles = {
  container: "flex",
  vertical: "flex-col space-y-2",
  horizontal: "flex-row space-x-4",
  radioItem: "flex items-center space-x-2 cursor-pointer",
  radioInput: "h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500",
  radioLabel: "text-zinc-300",
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  selectedValue,
  onChange,
  direction = "vertical",
}) => {
  const [selected, setSelected] = useState(selectedValue || "");

  const handleSelection = (value: string) => {
    setSelected(value);
    if (onChange) onChange(value);
  };

  return (
    <div
      className={`${radioStyles.container} ${
        direction === "vertical" ? radioStyles.vertical : radioStyles.horizontal
      }`}
    >
      {options.map((option) => (
        <label key={option.value} className={radioStyles.radioItem}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={() => handleSelection(option.value)}
            className={radioStyles.radioInput}
          />
          <span className={radioStyles.radioLabel}>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

// ---

const RadioGroupDemo = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelection = (value: string) => {
    setSelectedValue(value);
    console.log("Selected value:", value);
  };

  return (
    <div className="p-4 space-y-6">
      <p className="text-zinc-500">Vertical Radio Group</p>
      <RadioGroup
        name="fruits"
        options={[
          { label: "Apple", value: "apple" },
          { label: "Banana", value: "banana" },
          { label: "Cherry", value: "cherry" },
        ]}
        selectedValue={selectedValue}
        onChange={handleSelection}
        direction="vertical"
      />

      <p className="text-zinc-500">Horizontal Radio Group </p>
      <RadioGroup
        name="colors"
        options={[
          { label: "Red", value: "red" },
          { label: "Blue", value: "blue" },
          { label: "Green", value: "green" },
        ]}
        onChange={(value) => console.log("Color selected:", value)}
        direction="horizontal"
      />

      <div className="text-zinc-500">
        Selected Fruit: <strong>{selectedValue || "None"}</strong>
      </div>
    </div>
  );
};

const RadioGroupComponentLayout = () => {
  const codeSnippet = `

import { RadioGroup } from "@/components/radio-group/radio-group";
import { useState } from "react";

const RadioGroupDemo = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelection = (value: string) => {
    setSelectedValue(value);
    console.log("Selected value:", value);
  };

  return (
    <div className="p-4 space-y-6">
      <p className="text-zinc-500">Vertical Radio Group</p>
      <RadioGroup
        name="fruits"
        options={[
          { label: "Apple", value: "apple" },
          { label: "Banana", value: "banana" },
          { label: "Cherry", value: "cherry" },
        ]}
        selectedValue={selectedValue}
        onChange={handleSelection}
        direction="vertical"
      />

      <p className="text-zinc-500">Horizontal Radio Group </p>
      <RadioGroup
        name="colors"
        options={[
          { label: "Red", value: "red" },
          { label: "Blue", value: "blue" },
          { label: "Green", value: "green" },
        ]}
        onChange={(value:string) => console.log("Color selected:", value)}
        direction="horizontal"
      />

      <div className="text-zinc-500">
        Selected Fruit: <strong>{selectedValue || "None"}</strong>
      </div>
    </div>
  );
};

export default RadioGroupDemo;
`;

  const componentCode = `
// /components/radio-group/radio-group.tsx

import React, { useState } from "react";

interface RadioGroupOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioGroupOption[]; // Array of radio options
  name: string; // Name for the radio group
  selectedValue?: string; // Initially selected value
  onChange?: (value: string) => void; // Callback when the selected value changes
  direction?: "horizontal" | "vertical"; // Orientation of radio buttons
}

const radioStyles = {
  container: "flex",
  vertical: "flex-col space-y-2",
  horizontal: "flex-row space-x-4",
  radioItem: "flex items-center space-x-2 cursor-pointer",
  radioInput: "h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500",
  radioLabel: "text-zinc-300",
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  selectedValue,
  onChange,
  direction = "vertical",
}) => {
  const [selected, setSelected] = useState(selectedValue || "");

  const handleSelection = (value: string) => {
    setSelected(value);
    if (onChange) onChange(value);
  };

  return (
    <div
      className={\`\${radioStyles.container} \${
        direction === "vertical" ? radioStyles.vertical : radioStyles.horizontal
      }\`}
    >
      {options.map((option) => (
        <label key={option.value} className={radioStyles.radioItem}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={() => handleSelection(option.value)}
            className={radioStyles.radioInput}
          />
          <span className={radioStyles.radioLabel}>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export { RadioGroup }
`;

  return (
    <ComponentsLayout
      componentTitle="Radio Group"
      componentDescription="A flexible and customizable Radio Group component for selecting one option from a list."
      codeSnippet={codeSnippet}
      componentCode={componentCode}
      livePreviewCode={<RadioGroupDemo />}
      componentsUses="Radio Group is a useful component for selecting one option from a list."
      componentPath="@/components/RadioGroup"
    />
  );
};

export default RadioGroupComponentLayout;
