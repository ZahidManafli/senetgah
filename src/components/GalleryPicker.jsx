import React, { useEffect, useState } from "react";
import { getUserPosts } from "../services/addWorkServices";

// A gallery component that allows the user to pick one of their uploaded posts.
// Props:
//   onSelect(post)  - called when the user confirms their selection.
//   onCancel()      - called when the user cancels the dialog.
const GalleryPicker = ({ onSelect, onCancel }) => {
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const {
        success,
        posts: fetchedPosts,
        error: fetchError,
      } = await getUserPosts();
      if (success) {
        setPosts(fetchedPosts);
      } else {
        setError(fetchError || "Failed to fetch posts");
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleConfirm = () => {
    if (!selectedId) return;
    const post = posts.find((p) => p.id === selectedId);
    if (post && onSelect) onSelect(post);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const renderBody = () => (
    <>
      <header className="flex items-baseline justify-between">
        <h2 className="text-3xl font-baskervville baskervville-400 m-0">
          Your Gallery
        </h2>
        <p className="italic text-md opacity-70 font-baskervville baskervville-400">
          your vibe, your art - show us your view.
        </p>
      </header>

      {/* Mosaic / Masonry layout using CSS columns */}
      <section className="columns-2 sm:columns-3 md:columns-4 gap-4 mt-8 space-y-4">
        {posts.map((post) => {
          const isSelected = selectedId === post.id;
          return (
            <div
              key={post.id}
              onClick={() => setSelectedId(post.id)}
              className={`relative cursor-pointer overflow-hidden rounded-lg ring-4 mb-4 break-inside-avoid ${
                isSelected ? "ring-[#485439]" : "ring-transparent"
              } hover:ring-[#485439] transition ring-offset-0`}
            >
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title || "Artwork"}
                  className="w-full h-auto object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-sm text-gray-600 font-urbanist urbanist-400">
                  No image
                </div>
              )}
            </div>
          );
        })}
      </section>

      <div className="flex justify-end gap-4 mt-8 font-urbanist urbanist-400">
        <button
          onClick={handleConfirm}
          disabled={!selectedId}
          className={`min-w-[120px] px-18 cursor-pointer py-3 rounded-md text-white transition-colors ${
            selectedId
              ? "bg-[#485439] hover:bg-[#3b4531]"
              : "bg-[#485439] opacity-60 cursor-not-allowed"
          }`}
        >
          Select
        </button>
        <button
          onClick={handleCancel}
          className="min-w-[120px] px-18 py-3 cursor-pointer rounded-md border-2 border-[#485439] text-[#485439] hover:bg-[#485439]/10"
        >
          Cancel
        </button>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#FBFAEE] rounded-xl p-8 w-full max-w-5xl mx-4 overflow-auto font-urbanist urbanist-400">
        {loading && <p className="text-center my-10">Loading your gallery…</p>}
        {error && <p className="text-center my-10 text-red-600">{error}</p>}
        {!loading && !error && posts.length === 0 && (
          <p className="text-center my-10">
            No posts yet. Upload some artwork to see it here!
          </p>
        )}
        {!loading && !error && posts.length > 0 && renderBody()}
      </div>
    </div>
  );
};

export default GalleryPicker;
