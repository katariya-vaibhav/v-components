"use client";

import ComponentsLayout from "@/app/component/ComponentsLayout";
import React, { useState } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[]; // Array of select options
  placeholder?: string; // Placeholder text
  selectedValue?: string; // Initial selected value
  onChange?: (value: string) => void; // Callback when the selected value changes
  disabled?: boolean; // Disable the select component
}

const selectStyles = {
  container: "relative w-full",
  selectBox:
    "w-full p-2 bg-zinc-900 border-[1px] border-zinc-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
  optionList:
    "absolute z-10 w-full bg-zinc-900 border-[1px] border-zinc-500 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto",
  optionItem:
    "p-2 text-zinc-300 hover:bg-zinc-700 hover:text-white cursor-pointer",
  optionItemDisabled: "p-2 text-zinc-400 cursor-not-allowed",
  selectedOption: "bg-zinc-700 text-white",
  placeholder: "text-zinc-400",
};

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option...",
  selectedValue,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedValue || "");

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <div className={selectStyles.container}>
      <div
        onClick={toggleDropdown}
        className={`${selectStyles.selectBox} ${
          disabled ? "bg-zinc-900 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {selected ? (
          options.find((option) => option.value === selected)?.label
        ) : (
          <span className={selectStyles.placeholder}>{placeholder}</span>
        )}
      </div>
      {isOpen && !disabled && (
        <ul className={selectStyles.optionList}>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => !disabled && handleSelect(option.value)}
              className={`${selectStyles.optionItem} ${
                selected === option.value ? selectStyles.selectedOption : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ---

const SelectDemo = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelection = (value: string) => {
    setSelectedValue(value);
    console.log("Selected value:", value);
  };

  return (
    <div className="p-4 w-[15rem] space-y-6">
    
     <p className="text-zinc-500">Default Select</p>
      <Select
        options={[
          { label: "Apple", value: "apple" },
          { label: "Banana", value: "banana" },
          { label: "Cherry", value: "cherry" },
        ]}
        placeholder="Choose a fruit..."
        onChange={handleSelection}
      />

      <p className="text-zinc-500">Disabled Select</p>
      <Select
        options={[
          { label: "Red", value: "red" },
          { label: "Blue", value: "blue" },
          { label: "Green", value: "green" },
        ]}
        placeholder="Disabled select"
        disabled
      />

      <div className="text-zinc-500">
        Selected Fruit: <strong>{selectedValue || "None"}</strong>
      </div>
    </div>
  );
};

const SelectComponentLayout = () => {
  const codeSnippet = `
import { Select } from '@/components/select/select';
import { useState } from 'react';

const SelectDemo = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelection = (value: string) => {
    setSelectedValue(value);
    console.log("Selected value:", value);
  };

  return (
    <div className="p-4 w-[15rem] space-y-6">
    
     <p className="text-zinc-500">Default Select</p>
      <Select
        options={[
          { label: "Apple", value: "apple" },
          { label: "Banana", value: "banana" },
          { label: "Cherry", value: "cherry" },
        ]}
        placeholder="Choose a fruit..."
        onChange={handleSelection}
      />

      <p className="text-zinc-500">Disabled Select</p>
      <Select
        options={[
          { label: "Red", value: "red" },
          { label: "Blue", value: "blue" },
          { label: "Green", value: "green" },
        ]}
        placeholder="Disabled select"
        disabled
      />

      <div className="text-zinc-500">
        Selected Fruit: <strong>{selectedValue || "None"}</strong>
      </div>
    </div>
  );
};

export default SelectDemo;
`;

  const componentCode = `
// /components/select/select.tsx   

import React, { useState } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[]; // Array of select options
  placeholder?: string; // Placeholder text
  selectedValue?: string; // Initial selected value
  onChange?: (value: string) => void; // Callback when the selected value changes
  disabled?: boolean; // Disable the select component
}

const selectStyles = {
  container: "relative w-full",
  selectBox:
    "w-full p-2 bg-zinc-900 border-[1px] border-zinc-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
  optionList:
    "absolute z-10 w-full bg-zinc-900 border-[1px] border-zinc-500 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto",
  optionItem:
    "p-2 text-zinc-300 hover:bg-zinc-700 hover:text-white cursor-pointer",
  optionItemDisabled: "p-2 text-zinc-400 cursor-not-allowed",
  selectedOption: "bg-zinc-700 text-white",
  placeholder: "text-zinc-400",
};

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option...",
  selectedValue,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedValue || "");

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <div className={selectStyles.container}>
      <div
        onClick={toggleDropdown}
        className={\`\${selectStyles.selectBox} \${
          disabled ? "bg-zinc-900 cursor-not-allowed" : "cursor-pointer"
        }\`}
      >
        {selected ? (
          options.find((option) => option.value === selected)?.label
        ) : (
          <span className={selectStyles.placeholder}>{placeholder}</span>
        )}
      </div>
      {isOpen && !disabled && (
        <ul className={selectStyles.optionList}>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => !disabled && handleSelect(option.value)}
              className={\`\${selectStyles.optionItem} \${
                selected === option.value ? selectStyles.selectedOption : ""
              }\`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { Select }
`;

  return (
    <ComponentsLayout
      componentTitle="Select"
      componentDescription="A customizable Select component that provides a dropdown to choose an option."
      codeSnippet={codeSnippet}
      componentCode={componentCode}
      livePreviewCode={<SelectDemo />}
      componentPath="@/components/select/select.tsx"
      componentsUses="Select components are useful for selecting a single option from a list."
    />
  );
};

export default SelectComponentLayout;
