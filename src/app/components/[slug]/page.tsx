"use client";

import ComponentsLayout from "@/app/component/ComponentsLayout";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ComponentsProps {
  _id: string;
  ownerId: string;
  codeSnippet?: string;
  componentCode?: string;
  title?: string;
  description?: string;
  componentPath?: string;
  componentsUses?: string;
  liveCode?: React.ReactNode;
  owner?: string;
  image?: string;
  video?: string;
}

interface UserProps {
  _id: string;
  name: string;
}

const ComponentPage = () => {
  const { slug } = useParams();
  const router = useRouter();

  const [components, setComponents] = useState<ComponentsProps | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [componentPath, setComponentPath] = useState("");
  const [formImage, setFormImage] = useState<File | null>(null);
  const [formVideo, setFormVideo] = useState<File | null>(null);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const fetchComponents = async () => {
    try {
      const { data } = await axios.get(
        `/api/component/get-component?id=${slug}`
      );
      setComponents(data.components || null);
      setFormTitle(data.components?.title || "");
      setFormDescription(data.components?.description || "");
      setComponentPath(data.components?.componentPath || "");
    } catch (error) {
      console.error("Error fetching components:", error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get("/api/user/me");
      setCurrentUser(data.user);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const handleDelete = async () => {
    if (!components?._id) return;

    setDeleteLoading(true);
    try {
      await axios.delete(
        `/api/component/delete-component?id=${components._id}`
      );
      alert("Component deleted successfully!");
      router.push("/components");
    } catch (error) {
      console.error("Error deleting component:", error);
      alert("Failed to delete component. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!components?._id) return;

    setSaveLoading(true);

    const formData = new FormData();
    formData.append("title", formTitle);
    formData.append("description", formDescription);
    formData.append("componentPath", componentPath);

    if (formImage) formData.append("image", formImage);
    if (formVideo) formData.append("video", formVideo);

    try {
      await axios.put(
        `/api/component/update-component?id=${components._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Component updated successfully!");
      setComponents((prev) =>
        prev
          ? {
              ...prev,
              title: formTitle,
              description: formDescription,
              image: formImage ? URL.createObjectURL(formImage) : prev.image,
              video: formVideo ? URL.createObjectURL(formVideo) : prev.video,
            }
          : prev
      );
      closeDialog();
    } catch (error) {
      console.error("Error updating component:", error);
      alert("Failed to update component. Please try again.");
    } finally {
      setSaveLoading(false); // End loading animation
    }
  };

  useEffect(() => {
    fetchComponents();
    fetchCurrentUser();
  }, []);

  const isOwner =
    currentUser && components && currentUser._id === components.owner;

  return (
    <div className="md:p-4">
      {isOwner && (
        <div className="md:mt-4 flex py-3 md:justify-end space-x-4">
          <button
            onClick={openDialog}
            className="px-2 py-1 text-sm bg-zinc-600 hover:bg-zinc-700 text-white rounded"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteLoading}
            className={`px-2 py-1 text-sm ${
              deleteLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-400 hover:bg-red-500"
            } text-white rounded`}
          >
            {deleteLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Deleting...
                    </span>
                  ) : (
                    "Delete"
                  )}
          </button>
        </div>
      )}
      {components ? (
        <ComponentsLayout
          codeSnippet={components.codeSnippet || "No code snippet available"}
          componentCode={
            components.componentCode || "No component code provided"
          }
          componentTitle={components.title || "Untitled Component"}
          componentDescription={
            components.description || "No description available"
          }
          componentPath={
            components.componentPath || "src/components/UntitledComponent.tsx"
          }
          componentsUses={
            components.componentsUses || "No usage information provided"
          }
          livePreviewCode={components.liveCode || null}
          previewImage={components.image || null}
          previewVideo={components.video || null}
        />
      ) : (
        <p className="text-zinc-500">No components found.</p>
      )}

      {/* Dialog Component */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-zinc-900 border-[1px] border-zinc-700 rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Update Component</h3>
              <button
                onClick={closeDialog}
                className="text-zinc-200 hover:text-zinc-300"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text
                -zinc-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-zinc-700 rounded-md p-2 text-sm"
                  placeholder="Enter component title..."
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text
                -zinc-400 mb-1">
                  Path
                </label>
                <input
                  type="text"
                  value={componentPath}
                  onChange={(e) => setComponentPath(e.target.value)}
                  className="w-full bg-zinc-700 rounded-md p-2 text-sm"
                  placeholder="Enter component Path..."
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Description
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-zinc-700 rounded-md p-2 text-sm"
                  placeholder="Enter component description..."
                  rows={4}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormImage(e.target.files ? e.target.files[0] : null)
                  }
                  className="w-full bg-zinc-700 rounded-md p-2 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Video
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) =>
                    setFormVideo(e.target.files ? e.target.files[0] : null)
                  }
                  className="w-full bg-zinc-700 rounded-md p-2 text-sm"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeDialog}
                  className="px-4 py-2 text-sm bg-zinc-500 hover:bg-zinc-600 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                >
                  {saveLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentPage;
