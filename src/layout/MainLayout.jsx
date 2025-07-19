import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import { generateImageDescription } from "../services/addWorkServices";
import { addPostToProfile } from "../services/addWorkServices";
import "./layout.css"

export default function MainLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("Digital Art");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customCategory, setCustomCategory] = useState("");


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const getDescFromFotoAI = async () => {
    if (!file) return;
    setIsGenerating(true); // Start loader
    const reader = new FileReader();

    reader.onload = async (e) => {
      const base64Data = e.target.result.split(",")[1];
      try {
        const descriptionAI = await generateImageDescription(base64Data);
        setDescription(descriptionAI);
      } catch (error) {
        console.error("Error generating description:", error);
        alert("Failed to generate description. Please try again.");
      } finally {
        setIsGenerating(false); // Stop loader
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const finalCategory = category === "Other" ? customCategory : category;
    console.log({ title, description, finalCategory, file  });

    const payload = {
      "title": title,
      "description": description,
      "category": finalCategory,
      "imageFile": file
    }

    await addPostToProfile(payload);

    setIsModalOpen(false);
    setFile(null);
    setPreviewUrl(null);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="layout relative">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>

      {/* Floating Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex w-[60px] h-[60px] rounded-full text-[30px] justify-center items-center fixed bottom-3 right-5 bg-[#424F38] text-[#FBFAEE] z-50"
      >
        +
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black opacity-60 z-40 flex items-center justify-center"></div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 w-[100%] h-[100%] z-41 flex items-center justify-center">
          <div className="bg-[#FBFAEE] p-6 w-[80%] h-[80%] rounded-lg  shadow-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-[#9A7614] text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
              Upload your Work!
            </h2>
            <p className="text-gray-500 mb-4 italic">And let people vote it.</p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-4 h-[70%]"
            >
              {/* Upload area */}
              <label
                htmlFor="file-upload"
                className="w-full md:w-1/2 h-[100%] border-2 border-dashed border-[#9A7614] flex items-center justify-center cursor-pointer rounded-md bg-[#f5f1df] overflow-hidden"
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="text-center text-[#9A7614]">
                    <span role="img" aria-label="upload" className="text-2xl">
                      📤
                    </span>
                    <p className="text-sm">Upload</p>
                  </div>
                )}
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>

              {/* Right side inputs */}
              <div className="w-full md:w-1/2 flex flex-col gap-3">
                {/* Category selection */}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border h-[15%] rounded-md px-3 py-2 text-sm focus:outline-none bg-white text-gray-700"
                >
                  <option value="">Select Category</option>
                  <option value="Digital Art">Digital Art</option>
                  <option value="Photography">Photography</option>
                  <option value="Painting">Painting</option>
                  <option value="3D Model">3D Model</option>
                  <option value="Animation">Animation</option>
                  <option value="Other">Other</option>
                </select>

                {/* If 'Other' is selected, show manual input */}
                {category === "Other" && (
                  <input
                    type="text"
                    placeholder="Enter category manually"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="border h-[15%] rounded-md px-3 py-2 text-sm focus:outline-none mt-2"
                  />
                )}

                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border rounded-md h-[15%] px-3 py-2 text-sm focus:outline-none"
                />

                <textarea
                  rows="3"
                  placeholder="Type here"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border rounded-md px-3 py-2 h-[50%] resize-none text-sm focus:outline-none"
                ></textarea>

                <div className="flex justify-end items-center gap-2">
                  {isGenerating && (
                    <span className="text-xs text-gray-500 animate-pulse">
                      Generating...
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={getDescFromFotoAI}
                    disabled={isGenerating}
                    className={`text-sm border px-3 py-1 rounded-md 
      ${
        isGenerating
          ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300"
          : "text-[#9A7614] border-[#9A7614] hover:bg-[#f5f1df]"
      }`}
                  >
                    ⭐ Generate description
                  </button>
                </div>
              </div>
            </form>

            {/* Action buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-[#9A7614] hover:bg-[#b8911a] text-white  py-4 w-[30%] rounded-md"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="border border-[#9A7614] text-[#9A7614]  py-4 w-[30%] rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
