"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ComponentsCard from "../component/ComponentsCard";
import Link from "next/link";

const componentsList = [
  "alert",
  "input",
  "checkbox",
  "badge",
  "button",
  "dialog",
  "dropdown-menu",
  "hover-card",
  "menubar",
  "popover",
  "radio-group",
  "select",
  "slider",
  "tabs",
  "toggle",
  "tooltip",
];

interface ComponentsProps {
  _id: string;
  codeSnippet?: string;
  componentCode?: string;
  title?: string;
  description?: string;
  componentPath?: string;
  componentsUses?: string;
  liveCode?: React.ReactNode;
  image?: string;
  video?: string;
}

const Page = () => {
  const [componentsState, setComponentsState] = useState<{
    data: ComponentsProps[];
    loading: boolean;
  }>({ data: [], loading: true });

  const fetchComponents = async () => {
    try {
      const { data } = await axios.get("/api/component/all-component");
      setComponentsState({ data: data.components || [], loading: false });
    } catch (error) {
      console.error("Error fetching components:", error);
      setComponentsState({ data: [], loading: false });
    }
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  const renderMobileLinks = () =>
    componentsList.map((component) => (
      <li
        key={component}
        className="py-1 border-[1px] p-2 border-zinc-700 rounded-full my-1"
      >
        <Link href={`/components/${component}`}>{component}</Link>
      </li>
    ));

  const renderMobileInstallation = () => (
    <li className="py-1 border-[1px] p-2 border-zinc-700 rounded-full my-1">
      <Link href={`/components/installation`}>Installation</Link>
    </li>
  );

  const renderComponents = () =>
    componentsState.data.length > 0 ? (
      componentsState.data.map(({ _id, video, image, title, description }) => (
        <ComponentsCard
          key={_id}
          id={_id}
          video={video}
          image={image}
          title={title || "Untitled Component"}
          description={description || "Description not available"}
        />
      ))
    ) : (
      <p className="text-zinc-500">No components found.</p>
    );

  return (
    <>
      <div className="md:hidden">
        <h3 className="font-bold pb-2">Installation</h3>
        <ul className="flex flex-wrap text-md gap-2">
          {renderMobileInstallation()}
        </ul>
      </div>
      <div className="md:hidden">
        <h3 className="font-bold pb-2">Components</h3>
        <ul className="flex flex-wrap text-md gap-2">{renderMobileLinks()}</ul>
      </div>
      <div className="md:p-4 w-full min-h-full">
        <h2 className="text-md mt-3 md:mt-0 md:text-2xl font-bold mb-4">
          Users Components
        </h2>
        {componentsState.loading ? (
          <p>Loading Components...</p>
        ) : (
          <div className="flex gap-3 flex-wrap">{renderComponents()}</div>
        )}
      </div>
    </>
  );
};

export default Page;
