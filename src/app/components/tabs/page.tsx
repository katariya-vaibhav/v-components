"use client";

import ComponentsLayout from "@/app/component/ComponentsLayout";
import React, { useState } from "react";

interface TabItem {
  label: string; // Label of the tab
  content: React.ReactNode; // Content to display when the tab is active
}

interface TabsProps {
  tabs: TabItem[]; // Array of tabs
  defaultActiveTab?: number; // Index of the default active tab
  onTabChange?: (activeTabIndex: number) => void; // Callback when tab changes
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveTab = 0,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (onTabChange) onTabChange(index);
  };

  return (
    <div className="w-[20rem]">
      {/* Tab Headers */}
      <div className="flex justify-between border-b border-zinc-500">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`px-4 py-2 text-md font-medium transition-all border-b-2 focus:outline-none ${
              activeTab === index
                ? "text-zinc-300 border-zinc-600"
                : "text-zinc-500 border-transparent hover:text-zinc-600 hover:border-zinc-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {tabs[activeTab]?.content || <p>No content available</p>}
      </div>
    </div>
  );
};

// ---

const TabsDemo = () => {
  const tabs = [
    { label: "Home", content: <p>Welcome to the Home tab!</p> },
    { label: "Profile", content: <p>Here is the Profile tab content.</p> },
    {
      label: "Settings",
      content: <p>Adjust your preferences in the Settings tab.</p>,
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <Tabs
        tabs={tabs}
        defaultActiveTab={0}
        onTabChange={(index) => console.log("Active Tab:", index)}
      />
    </div>
  );
};

const SliderComponentLayout = () => {
  const codeSnippet = `
  import React, { useState } from "react";
  import { Tabs } from '@/components/tabs/tabs';
  const TabsDemo = () => {
  const tabs = [
    { label: "Home", content: <p>Welcome to the Home tab!</p> },
    { label: "Profile", content: <p>Here is the Profile tab content.</p> },
    {
      label: "Settings",
      content: <p>Adjust your preferences in the Settings tab.</p>,
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-xl font-bold">Tabs Component Demo</h1>
      <Tabs
        tabs={tabs}
        defaultActiveTab={0}
        onTabChange={(index) => console.log("Active Tab:", index)}
      />
    </div>
  );
};

export default TabsDemo;
  `;

  const componentCode = `
// /components/tabs/tabs.tsx
  
import React, { useState } from "react";

interface TabItem {
  label: string; // Label of the tab
  content: React.ReactNode; // Content to display when the tab is active
}

interface TabsProps {
  tabs: TabItem[]; // Array of tabs
  defaultActiveTab?: number; // Index of the default active tab
  onTabChange?: (activeTabIndex: number) => void; // Callback when tab changes
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveTab = 0,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (onTabChange) onTabChange(index);
  };

  return (
    <div className="w-[20rem]">
      {/* Tab Headers */}
      <div className="flex justify-between border-b border-zinc-500">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={\`\px-4 py-2 text-md font-medium transition-all border-b-2 focus:outline-none \${
              activeTab === index
                ? "text-zinc-300 border-zinc-600"
                : "text-zinc-500 border-transparent hover:text-zinc-600 hover:border-zinc-600"
            }\`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {tabs[activeTab]?.content || <p>No content available</p>}
      </div>
    </div>
  );
};

  export { Tabs }
  `;

  return (
    <ComponentsLayout
      componentTitle="Tabs"
      componentDescription="A tabbed interface for displaying different content sections."
      codeSnippet={codeSnippet}
      componentCode={componentCode}
      livePreviewCode={<TabsDemo />}
      componentsUses="This tabs component can be used to navigate between different content sections."
      componentPath="@/components/tabs"
    />
  );
};

export default SliderComponentLayout;
