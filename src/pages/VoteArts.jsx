import React from "react";
import VoteFrame from "../components/VoteFrame";
import Frame1 from "../assets/voteframe/frame1.png";
import Frame2 from "../assets/voteframe/frame2.png";
import Frame3 from "../assets/voteframe/frame3.png";
import Frame4 from "../assets/voteframe/Frame4.png";
import Frame5 from "../assets/voteframe/Frame5.png";
import Frame6 from "../assets/voteframe/Frame6.png";
import GalleryPicker from "../components/GalleryPicker";

const VoteArts = () => {
  const frames = [
    {
      title: "Summer Memories in Baku",
      description:
        "From golden sunsets on the Caspian Sea to lively city streets and coastal breezes.",
      img: Frame1,
    },
    {
      title: "Echoes of the Past Times",
      description:
        "Art that breathes life into history, from ancient ruins and artifacts to cultural traditions reimagined a modern lens.",
      img: Frame2,
    },
    {
      title: "Whispers of the Cosmos",
      description:
        "Art that explores the vastness of space — from starry skies and galaxies to imagined alien worlds .",
      img: Frame3,
    },
    {
      title: "Fragments of Childhood",
      description:
        "Art that brings back nostalgic memories, toys, games, and the warmth of childhood moments frozen in time.",
      img: Frame4,
    },
    {
      title: "Shadows and Silhouettes",
      description:
        "Explore the mystery of shadows and the beauty of silence, where light and darkness gather to tell hidden stories.",
      img: Frame5,
    },
    {
      title: "Under the Neon Glow Lights",
      description:
        "Vibrant neon lights illuminating urban scenes, blending modern nightlife energy with striking, colorful contrasts.",
      img: Frame6,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-20 text-[#212121] font-sans gap-12">
      <div className="max-w-4xl text-center">
        <h1 className="text-3xl md:text-5xl mb-6 font-baskervville baskervville-400">
          VoteFrame - Your Art, Their Votes
        </h1>
        <p className="text-lg md:text-xl font-urbanist urbanist-400">
          Share your creations, collect votes, and shine among the top three
          artists.
        </p>
      </div>

      {/* VoteFrame list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl">
        {frames.map((item, idx) => (
          <VoteFrame
            key={idx}
            title={item.title}
            description={item.description}
            icon={<img src={item.img} alt="icon" className="w-full h-full" />}
          />
        ))}
      </div>
    </div>
  );
};

export default VoteArts;
