"use client";
import React, { useState } from "react";
import ComponentsLayout from "@/app/component/ComponentsLayout";

interface DropdownMenuProps {
  buttonText: string;
  buttonStyles?: string;
  children?: React.ReactNode;
}

interface DropdownMenuBtnGroup {
  options: string[];
  onSelect: (option: string) => void;
  menuLabel?: string;
}

const DropDownStyles = {
  menuLabel:
    "px-4 py-2 border-b-[1px] border-t-[1px] border-zinc-700 text-white font-bold",
  buttonStyle:
    "px-4 py-2 bg-zinc-600 overflow-hidden text-white rounded-md hover:bg-zinc-700",
  menuItemStyle:
    "px-4 py-2 text-white rounded-md hover:bg-zinc-800 cursor-pointer",
};

const DropdownMenuOptionGroup: React.FC<DropdownMenuBtnGroup> = ({
  options,
  onSelect,
  menuLabel,
}) => {
  const handleSelect = (option: string) => {
    onSelect(option);
  };

  return (
    <ul className="text-gray-700">
      {menuLabel && <p className={DropDownStyles.menuLabel}>{menuLabel}</p>}
      {options.map((option) => (
        <li
          key={option}
          className={DropDownStyles.menuItemStyle}
          onClick={() => handleSelect(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  );
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  buttonText,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button onClick={toggleMenu} className={DropDownStyles.buttonStyle}>
        {buttonText}
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-zinc-950 border border-zinc-700 rounded-md shadow-lg z-10">
          {children}
        </div>
      )}
    </div>
  );
};

const DropdownDemo = () => {
  const handleSelection = (selectedOption: string) => {
    alert(`You selected: ${selectedOption}`);
  };

  return (
    <div className="space-y-4 flex flex-col">
      <DropdownMenu buttonText="Select Option">
        <DropdownMenuOptionGroup
          options={["Option 1", "Option 2", "Option 3"]}
          onSelect={handleSelection}
          menuLabel="Group 1"
        />
        <DropdownMenuOptionGroup
          options={["Option 4", "Option 5", "Option 6"]}
          onSelect={handleSelection}
          menuLabel="Group 2"
        />
      </DropdownMenu>
    </div>
  );
};

const componentCode = `
// @/components/DropdownMenu
import React, { useState } from "react";

interface DropdownMenuProps {
  buttonText: string;
  buttonStyles?: string;
  children?: React.ReactNode;
}

interface DropdownMenuBtnGroup {
  options: string[];
  onSelect: (option: string) => void;
  menuLabel?: string;
}

const DropDownStyles = {
  menuLabel:
    "px-4 py-2 border-b-[1px] border-t-[1px] border-zinc-700 text-white font-bold",
  buttonStyle:
    "px-4 py-2 bg-zinc-600 overflow-hidden text-white rounded-md hover:bg-zinc-700",
  menuItemStyle:
    "px-4 py-2 text-white rounded-md hover:bg-zinc-800 cursor-pointer",
};

// DropdownMenuOptionGroup Component
const DropdownMenuOptionGroup = ({ options, onSelect, menuLabel }) => {
  const handleSelect = (option) => {
    onSelect(option);
  };

  return (
    <ul className="text-gray-700">
      {menuLabel && <p className="px-4 py-2 border-b-[1px] border-t-[1px] border-zinc-700 text-white font-bold">{menuLabel}</p>}
      {options.map((option) => (
        <li
          key={option}
          className="px-4 py-2 text-white rounded-md hover:bg-zinc-800 cursor-pointer"
          onClick={() => handleSelect(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  );
};

// DropdownMenu Component
const DropdownMenu = ({ buttonText, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="px-4 py-2 bg-zinc-600 overflow-hidden text-white rounded-md hover:bg-zinc-700"
      >
        {buttonText}
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-zinc-950 border border-zinc-700 rounded-md shadow-lg z-10">
          {children}
        </div>
      )}
    </div>
  );
};

export {DropdownMenu , DropdownMenuOptionGroup}
`;

const codeSnippet = `
import React from "react";
import { DropdownMenu  , DropdownMenuOptionGroup } from '@/components/DropdownMenu';

const DropdownDemo = () => {
  const handleSelection = (selectedOption: string) => {
    alert(\`You selected: \${selectedOption}\`);
  };

  return (
    <div className="space-y-4 flex flex-col">
      <DropdownMenu buttonText="Select Option">
        <DropdownMenuOptionGroup
          options={["Option 1", "Option 2", "Option 3"]}
          onSelect={(option) => alert(\`You selected: \${option}\`)}
          menuLabel="Group 1"
        />
        <DropdownMenuOptionGroup
          options={["Option 4", "Option 5", "Option 6"]}
          onSelect={(option) => alert(\`You selected: \${option}\`)}
          menuLabel="Group 2"
        />
      </DropdownMenu>
    </div>
  );
};

export default DropdownDemo;

`;

const DropdownComponentLayout = () => {
  return (
    <ComponentsLayout
      componentTitle="Dropdown Menu"
      componentDescription="A customizable dropdown menu with grouped options and callbacks for selection."
      componentCode={componentCode}
      livePreviewCode={<DropdownDemo />}
      codeSnippet={codeSnippet}
      componentsUses="Custom dropdown menus for navigation or settings."
      componentPath="@/components/DropdownMenu"
    />
  );
};

export default DropdownComponentLayout;
