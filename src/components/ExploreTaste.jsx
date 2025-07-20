import React, { useRef } from "react";
import {
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Desire from "../assets/desire.png";
import Wedding from "../assets/wedding.png";
import Susha from "../assets/susha.png";

import crookedfaces from '../assets/cookedfaces.png'
import funnyloughters from '../assets/funnyloughters.png'
import zootopia from '../assets/zootopia.png'

const artworks = [
  {
    title: "Crooked Faces",
    artist: "Fidan Alizade",
    image: crookedfaces,
  },
  {
    title: "Funny Laughters",
    artist: "Nilay Shirinova",
    image: funnyloughters,
  },
  {
    title: "Zootopia Fan Art",
    artist: "Ali Aliyev",
    image: zootopia,
  },
];

export default function ExploreTaste() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className=" py-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[30px] font-semibold mb-6 baskervville-400">Explore Your Taste</h2>
        <p className="text-[20px] baskervville-400">and broaden your creativity.</p>
      </div>

      <div
        ref={scrollRef}
        className="grid grid-cols-3 gap-6 overflow-x-auto pb-2 scroll-smooth"
      >
        {artworks.map((art, index) => (
          <div
            key={index}
            className="relative min-w-[260px] bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={art.image}
              alt={art.title}
              className="h-70 w-full object-cover"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-white">
              <h3 className="text-md font-semibold baskervville-400">{art.title}</h3>
              <p className="text-xs italic baskervville-400">{art.artist}</p>
            </div>
            <button className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
              <ArrowUpRightIcon className="w-4 h-4 text-black" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <div className="space-x-2 hidden md:flex">
          <button
            onClick={scrollLeft}
            className="p-1 border rounded-full hover:bg-gray-100"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            className="p-1 border rounded-full hover:bg-gray-100"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
