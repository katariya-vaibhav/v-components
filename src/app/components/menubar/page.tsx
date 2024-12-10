"use client";
import ComponentsLayout from "@/app/component/ComponentsLayout";
import React from "react";

interface MenuBarItemProps {
  content: string;
  tooltip: string;
  link?: string;
  linkText?: string;
}

const menuBarStyles = {
  base: "relative group inline-block px-4 py-2",
  body: "absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-gray-950 text-white rounded-md p-2 shadow-md transition-opacity duration-300 border border-zinc-800",
  tooltip: "text-sm w-[10rem] text-zinc-300",
  link: "text-sm mt-2 text-zinc-400 hover:text-zinc-500",
};

const MenuBarItem: React.FC<MenuBarItemProps> = ({
  content,
  tooltip,
  link,
  linkText = "Go to Link",
}) => {
  return (
    <div className={menuBarStyles.base}>
      <div>{content}</div>
      <div className={menuBarStyles.body}>
        <p className={menuBarStyles.tooltip}>{tooltip}</p>
        {link && (
          <a href={link} target="_blank" className={menuBarStyles.link}>
            {linkText}
          </a>
        )}
      </div>
    </div>
  );
};

const MenuBarDemo = () => {
    return (
      <div className="flex space-x-6">
        <MenuBarItem
          content="Home"
          tooltip="Go to homepage"
          link="https://yourwebsite.com/home"
        />
        <MenuBarItem
          content="About"
          tooltip="Learn more about us"
          link="https://yourwebsite.com/about"
        />
        <MenuBarItem
          content="Services"
          tooltip="Explore our services"
          link="https://yourwebsite.com/services"
        />
        <MenuBarItem
          content="Contact"
          tooltip="Get in touch"
          link="https://yourwebsite.com/contact"
        />
      </div>
    );
  };
  

  const MenuBarComponentLayout = () => {
    const codeSnippet = `
  import React from 'react';
  import MenuBarItem from "@/components/MenuBar/MenuBarItem";
  
  const MenuBarDemo = () => {
    return (
      <div className="flex space-x-6">
        <MenuBarItem
          content="Home"
          tooltip="Go to homepage"
          link="https://yourwebsite.com/home"
        />
        <MenuBarItem
          content="About"
          tooltip="Learn more about us"
          link="https://yourwebsite.com/about"
        />
        <MenuBarItem
          content="Services"
          tooltip="Explore our services"
          link="https://yourwebsite.com/services"
        />
        <MenuBarItem
          content="Contact"
          tooltip="Get in touch"
          link="https://yourwebsite.com/contact"
        />
      </div>
    );
  };
  
  export default MenuBarDemo;
  `;
  
    const componentCode = `
  //@/components/MenuBar/MenuBarItem.tsx
  
  import React from "react";
  
  interface MenuBarItemProps {
    content: string;
    tooltip: string;
    link?: string;
    linkText?: string;
  }
  
  const menuBarStyles = {
    base: "relative group inline-block px-4 py-2",
    body: "absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-gray-950 text-white rounded-md p-2 shadow-md transition-opacity duration-300 border border-zinc-800",
    tooltip: "text-sm w-[10rem] text-zinc-300",
    link: "text-sm mt-2 text-zinc-400 hover:text-zinc-500",
  };
  
  const MenuBarItem: React.FC<MenuBarItemProps> = ({
    content,
    tooltip,
    link,
    linkText = "Go to Link",
  }) => {
    return (
      <div className={menuBarStyles.base}>
        <div>{content}</div>
        <div className={menuBarStyles.body}>
          <p className={menuBarStyles.tooltip}>{tooltip}</p>
          {link && (
            <a href={link} target="_blank" className={menuBarStyles.link}>
              {linkText}
            </a>
          )}
        </div>
      </div>
    );
  };
  
  export default MenuBarItem;
  `;
  
    return (
      <ComponentsLayout
        componentTitle="Menu Bar"
        componentDescription="A menu bar with interactive tooltip previews that appear on hover. It is customizable for various menu items."
        codeSnippet={codeSnippet}
        componentCode={componentCode}
        componentPath="@/components/MenuBar"
        componentsUses="This component is ideal for navigation menus where extra details need to be shown when hovering over menu items."
        livePreviewCode={<MenuBarDemo />}
      />
    );
  };
  
  export default MenuBarComponentLayout;
  
  
