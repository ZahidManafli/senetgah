import React, { useEffect, useState } from "react";
import {
  CameraIcon,
  AtSymbolIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { getUserPosts } from "../services/addWorkServices";
import PostModal from "../components/PostModal";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getUserPosts();
      if (result.success) {
        setPosts(result.posts);
      }
      setLoadingPosts(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center py-10  text-[#212121] font-sans">
      {/* Avatar */}
      <div className="w-28 h-28 rounded-full bg-[#E9E7D6] flex items-center justify-center overflow-hidden">
        {/* Replace this emoji with an actual avatar image if available */}
        <span role="img" aria-label="avatar" className="text-7xl">
          🙋
        </span>
      </div>

      {/* Name */}
      <h1 className="mt-6 font-baskervville text-3xl md:text-4xl">
        Zahid Manafli
      </h1>

      {/* Contact Info */}
      <div className="flex flex-col md:flex-row flex-wrap gap-4 mt-4 items-center text-gray-700">
        <div className="flex items-center gap-2">
          <CameraIcon className="w-5 h-5" />
          <span>@zahid.art</span>
        </div>
        <div className="flex items-center gap-2">
          <AtSymbolIcon className="w-5 h-5" />
          <span>zahidmanafli2018@gmail.com</span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-5 h-5" />
          <span>(055) 647-63-93</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-xl">
        <div className="bg-[#EBE9D4] rounded-lg py-3 flex flex-col items-center justify-center">
          <span className="text-2xl">12.5K</span>
          <span className="text-sm font-light text-gray-600">Total likes</span>
        </div>
        <div className="bg-[#EBE9D4] rounded-lg py-3 flex flex-col items-center justify-center">
          <span className="text-2xl">109</span>
          <span className="text-sm font-light text-gray-600">
            Winned VoteFrame
          </span>
        </div>
        <div className="bg-[#EBE9D4] rounded-lg py-3 flex flex-col items-center justify-center">
          <span className="text-2xl">247</span>
          <span className="text-sm font-light text-gray-600">
            Joined VoteFrame
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 w-full max-w-xl">
        <div className="flex justify-between px-20  mb-6">
          <button
            onClick={() => setActiveTab("posts")}
            className={`mr-6 pb-0 text-lg text-black font-light focus:outline-none ${
              activeTab === "posts"
                ? "border-b-2 border-[#424F38] text-[#424F38]"
                : "text-gray-600 hover:text-[#424F38]"
            }`}
          >
            Posts
          </button>
          <button
            disabled
            className="pb-2 text-lg font-light text-gray-400 cursor-not-allowed flex items-center gap-2"
          >
            Collections
            <span className="text-xs italic">(coming&nbsp;soon)</span>
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="w-full max-w-4xl">
        {activeTab === "posts" && (
          <div>
            {loadingPosts ? (
              <p className="text-center text-gray-500">Loading posts...</p>
            ) : posts.length === 0 ? (
              <p className="text-center text-gray-500">No posts yet.</p>
            ) : (
              <div className="grid grid-cols-3 auto-rows-[200px] gap-6 grid-flow-dense">
                {posts.map((post, idx) => {
                  const isFeatured = idx === 0; // make first post large
                  return (
                    <div
                      key={post.id}
                      className={`relative group overflow-hidden rounded-lg ${
                        isFeatured ? "col-span-2 row-span-2" : ""
                      }`}
                      role="button"
                      onClick={() => setSelectedPost(post)}
                    >
                      {post.image && (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-white text-lg font-semibold mb-1 line-clamp-1">
                          {post.title}
                        </h3>
                        <p className="text-white text-sm line-clamp-3">
                          {post.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for post details */}
      <PostModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
      />
    </div>
  );
};

export default Profile;
