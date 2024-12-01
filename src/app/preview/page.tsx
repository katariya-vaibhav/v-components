"use client";

import React, { useEffect, useState } from "react";
import ComponentsLayout from "@/app/component/ComponentsLayout";
import axios from "axios";

const PreviewPage = () => {
  const [previewData, setPreviewData] = useState<any>(null);
  const [submitStatus, setSubmitStatus] = useState<string>("");

  useEffect(() => {
    const storedData = localStorage.getItem("componentPreviewData");
    if (storedData) {
      setPreviewData(JSON.parse(storedData));
    }
  }, []);

  const handleSubmitToBackend = async () => {
    if (!previewData) {
      setSubmitStatus("No data available to submit.");
      return;
    }

    try {
      // Construct FormData
      const formData = new FormData();
      formData.append("componentTitle", previewData.componentTitle);
      formData.append("componentDescription", previewData.componentDescription);
      formData.append("componentPath", previewData.componentPath);
      formData.append("codeSnippet", previewData.codeSnippet);
      formData.append("componentCode", previewData.componentCode);

      // Append media file if present
      if (previewData.previewMedia) {
        const blob = await fetch(previewData.previewMedia).then((r) =>
          r.blob()
        );
        formData.append(
          "previewMedia",
          blob,
          "media." + blob.type.split("/")[1]
        );
        formData.append("mediaType", previewData.mediaType);
      }

      // Submit to backend
      const { data } = await axios.post("/api/component/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(data);

      setSubmitStatus(data.message);
    } catch (error) {
      console.error("Error submitting to backend:", error);
      setSubmitStatus("Error submitting to backend.");
    }
  };

  if (!previewData) {
    return <div className="text-center text-white">Loading preview...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      <ComponentsLayout
        codeSnippet={previewData.codeSnippet}
        componentCode={previewData.componentCode}
        componentTitle={previewData.componentTitle}
        componentDescription={previewData.componentDescription}
        componentPath={previewData.componentPath}
        previewImage={
          previewData.mediaType === "image" ? previewData.previewMedia : null
        }
        previewVideo={
          previewData.mediaType === "video" ? previewData.previewMedia : null
        }
      />

      <div className="flex justify-center mt-6">
        <button
          onClick={handleSubmitToBackend}
          className="bg-blue-600 text-white py-2 px-6 rounded-md shadow hover:bg-blue-700"
        >
          Create a Component
        </button>
      </div>

      {submitStatus && (
        <div className="mt-4 text-center text-sm text-white">
          {submitStatus}
        </div>
      )}
    </div>
  );
};

export default PreviewPage;
