"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useUserData from "@/utils/getUserData";

const CreateComponent = () => {
  const [formData, setFormData] = useState({
    codeSnippet: "",
    componentCode: "",
    title: "",
    description: "",
    type: "",
    componentPath: "",
    componentsUses: "",
    previewMedia: null as File | null,
    mediaType: "" as "image" | "video" | "",
  });
  const [previewMediaUrl, setPreviewMediaUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const { isUserSignedIn, loading } = useUserData();


  if (!loading && !isUserSignedIn) {
    router.push("/auth");
  }

  useEffect(() => {
    // Clean up preview URL when component unmounts or media changes
    return () => {
      if (previewMediaUrl) {
        URL.revokeObjectURL(previewMediaUrl);
        setPreviewMediaUrl(null);
      }
    };
  }, [previewMediaUrl]);

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
      setPreviewMediaUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.componentPath ||
      !formData.codeSnippet ||
      !formData.componentCode ||
      !formData.type ||
      !formData.componentsUses
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!formData.previewMedia) {
      setErrorMessage("Please upload an image or video.");
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    // Prepare FormData for submission
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("type", formData.type);
    form.append("componentPath", formData.componentPath);
    form.append("codeSnippet", formData.codeSnippet);
    form.append("componentCode", formData.componentCode);
    form.append("componentsUses", formData.componentsUses);

    // Append media file (image or video)
    if (formData.mediaType === "image" && formData.previewMedia) {
      form.append("image", formData.previewMedia);
    }
    if (formData.mediaType === "video" && formData.previewMedia) {
      form.append("video", formData.previewMedia);
    }

    try {
      const response = await axios.post("/api/component/create", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = response.data;
      console.log(result);

      if (result.status === 201) {
        // Redirect to the preview page after successful creation
        router.push(`/components/${result.data._id}`);
      } else {
        setErrorMessage(result.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error while submitting component:", error);
      setErrorMessage("Failed to submit component. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 px-4 py-6">
      <div className="bg-zinc-900 shadow-md border border-zinc-700 rounded-lg p-6 max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Create a New Component
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Component Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
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
              name="description"
              value={formData.description}
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
              placeholder="Enter component code..."
              rows={4}
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Type
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full border border-zinc-600 bg-zinc-800 p-2 rounded-md shadow-sm focus:ring-zinc-500 focus:border-zinc-500 text-sm text-white"
              placeholder="Enter component type..."
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Usage Examples
            </label>
            <textarea
              name="componentsUses"
              value={formData.componentsUses}
              onChange={handleInputChange}
              className="w-full border border-zinc-600 bg-zinc-800 p-2 rounded-md shadow-sm focus:ring-zinc-500 focus:border-zinc-500 text-sm text-white"
              placeholder="How to use this component..."
              rows={2}
              required
            />
          </div>

          <div className="col-span-2 flex justify-between">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Component"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComponent;
