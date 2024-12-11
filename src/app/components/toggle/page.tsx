"use client";

import ComponentsLayout from "@/app/component/ComponentsLayout";
import React, { useState } from "react";

interface ToggleProps {
  isOn: boolean; // Initial state of the toggle
  onChange: (isOn: boolean) => void; // Callback for toggle state change
  disabled?: boolean; // Disable the toggle
  labels?: { on: string; off: string }; // Optional labels for on/off states
}

const Toggle: React.FC<ToggleProps> = ({
  isOn,
  onChange,
  disabled = false,
  labels = { on: "On", off: "Off" },
}) => {
  const [toggleState, setToggleState] = useState(isOn);

  const handleToggle = () => {
    if (disabled) return;
    const newState = !toggleState;
    setToggleState(newState);
    onChange(newState);
  };

  return (
    <div
      className={`relative inline-flex items-center cursor-pointer select-none w-12 h-6 rounded-full transition-all ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${toggleState ? "bg-zinc-700" : "bg-zinc-500"}`}
      onClick={handleToggle}
    >
      {/* Toggle Circle */}
      <div
        className={`w-5 h-5 rounded-full z-[5]  shadow-md transition-transform ${
          toggleState
            ? "translate-x-6 bg-zinc-800"
            : "translate-x-1 bg-zinc-300"
        }`}
      ></div>
      {/* Labels */}
      {labels && (
        <div
          className={`absolute flex font-semibold justify-between w-full px-2 text-xs  ${
            toggleState ? "text-zinc-300 " : "text-zinc-800 "
          }`}
        >
          <span>{labels.off}</span>
          <span>{labels.on}</span>
        </div>
      )}
    </div>
  );
};

// ---

const ToggleDemo = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="p-6 space-y-8">
      <p className="text-zinc-500">Default Toggle</p>
      <Toggle isOn={isToggled} onChange={(state) => setIsToggled(state)} />
      <p className="text-sm text-zinc-500">
        Toggle is: {isToggled ? "On" : "Off"}
      </p>

      <p className="text-zinc-500">Disabled Toggle</p>
      <Toggle isOn={true} onChange={() => {}} disabled />
    </div>
  );
};

const ToggleComponentLayout = () => {
  const codeSnippet = `
import React, { useState } from "react";
import { Toggle } from '@/components/toggle/toggle';
const ToggleDemo = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="p-6 space-y-8">
      <p className="text-zinc-500">Default Toggle</p>
      <Toggle isOn={isToggled} onChange={(state) => setIsToggled(state)} />
      <p className="text-sm text-zinc-500">
        Toggle is: {isToggled ? "On" : "Off"}
      </p>

      <p className="text-zinc-500">Disabled Toggle</p>
      <Toggle isOn={true} onChange={() => {}} disabled />
    </div>
  );
};

  
export default ToggleDemo;
    `;

  const componentCode = `
// /components/toggle/toggle.tsx
    
import React, { useState } from "react";

interface ToggleProps {
  isOn: boolean; // Initial state of the toggle
  onChange: (isOn: boolean) => void; // Callback for toggle state change
  disabled?: boolean; // Disable the toggle
  labels?: { on: string; off: string }; // Optional labels for on/off states
}

const Toggle: React.FC<ToggleProps> = ({
  isOn,
  onChange,
  disabled = false,
  labels = { on: "On", off: "Off" },
}) => {
  const [toggleState, setToggleState] = useState(isOn);

  const handleToggle = () => {
    if (disabled) return;
    const newState = !toggleState;
    setToggleState(newState);
    onChange(newState);
  };

  return (
    <div
      className={\`\relative inline-flex items-center cursor-pointer select-none w-12 h-6 rounded-full transition-all \${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } \${toggleState ? "bg-zinc-700" : "bg-zinc-500"}\`}
      onClick={handleToggle}
    >
      {/* Toggle Circle */}
      <div
        className={\`\w-5 h-5 rounded-full z-[5]  shadow-md transition-transform \${
          toggleState
            ? "translate-x-6 bg-zinc-800"
            : "translate-x-1 bg-zinc-300"
        }\`}
      ></div>
      {/* Labels */}
      {labels && (
        <div
          className={\`\absolute flex font-semibold justify-between w-full px-2 text-xs  \${
            toggleState ? "text-zinc-300 " : "text-zinc-800 "
          }\`}
        >
          <span>{labels.off}</span>
          <span>{labels.on}</span>
        </div>
      )}
    </div>
  );
};
export { Toggle }
    `;

  return (
    <ComponentsLayout
      componentTitle="Toggle"
      componentDescription="A simple tabs component with support for active tab selection."
      componentPath="@/components/toggle"
      codeSnippet={codeSnippet}
      componentCode={componentCode}
      livePreviewCode={<ToggleDemo />}
      componentsUses="The Tabs component can be used to display tabbed content and handle tab selection."
    />
  );
};

export default ToggleComponentLayout;
