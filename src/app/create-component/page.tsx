"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateComponent = () => {
  const [formData, setFormData] = useState({
    codeSnippet: "",
    componentCode: "",
    componentTitle: "",
    componentDescription: "",
    componentPath: "",
    previewMedia: null as File | null,
    mediaType: "",
  });

  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type.startsWith("video/") ? "video" : "image";
      setFormData((prev) => ({
        ...prev,
        previewMedia: file,
        mediaType: fileType,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Store data in localStorage
    const dataToStore = {
      ...formData,
      previewMedia: formData.previewMedia
        ? URL.createObjectURL(formData.previewMedia) // Store URL for localStorage
        : null,
    };
    localStorage.setItem("componentPreviewData", JSON.stringify(dataToStore));

    // Redirect to preview page
    router.push("/preview");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 px-4 py-6">
      <div className="bg-zinc-900 shadow-md border border-zinc-700 rounded-lg p-6 max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Create a New Component
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Component Title
            </label>
            <input
              type="text"
              name="componentTitle"
              value={formData.componentTitle}
              onChange={handleInputChange}
              className="w-full border border-zinc-600 bg-zinc-800 p-2 rounded-md shadow-sm focus:ring-zinc-500 focus:border-zinc-500 text-sm text-white"
              placeholder="Enter component title..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Component Description
            </label>
            <textarea
              name="componentDescription"
              value={formData.componentDescription}
              onChange={handleInputChange}
              className="w-full border border-zinc-600 bg-zinc-800 p-2 rounded-md shadow-sm focus:ring-zinc-500 focus:border-zinc-500 text-sm text-white"
              placeholder="Enter component description..."
              rows={2}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Preview Media (Image/Video)
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaChange}
              className="w-full text-zinc-200 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-zinc-500 file:text-zinc-200 hover:file:bg-zinc-600"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Component Path
            </label>
            <input
              type="text"
              name="componentPath"
              value={formData.componentPath}
              onChange={handleInputChange}
              className="w-full border border-zinc-600 bg-zinc-800 p-2 rounded-md shadow-sm focus:ring-zinc-500 focus:border-zinc-500 text-sm text-white"
              placeholder="src/components/YourComponent.tsx"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Code Snippet
            </label>
            <textarea
              name="codeSnippet"
              value={formData.codeSnippet}
              onChange={handleInputChange}
              className="w-full border border-zinc-600 bg-zinc-800 p-2 rounded-md shadow-sm focus:ring-zinc-500 focus:border-zinc-500 text-sm text-white"
              placeholder="Enter code snippet..."
              rows={4}
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Component Code
            </label>
            <textarea
              name="componentCode"
              value={formData.componentCode}
              onChange={handleInputChange}
              className="w-full border border-zinc-600 bg-zinc-800 p-2 rounded-md shadow-sm focus:ring-zinc-500 focus:border-zinc-500 text-sm text-white"
              placeholder="Enter code snippet..."
              rows={4}
              required
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Preview Component
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComponent;
