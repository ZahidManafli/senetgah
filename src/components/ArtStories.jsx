import React from "react";

import Tahir from "../assets/tahir.png";
import Togrul from "../assets/togrul.png";
import Azim from "../assets/azim.png";
import Arif from "../assets/arif.png";
import Gazanfar from "../assets/gazanfar.png";
import Maral from "../assets/maral.png";
import Geysar from "../assets/geysar.png";

import DigitalArt from "../assets/digital-art.png";
import LogoArt from "../assets/logo-art.png";
import Painting from "../assets/painting.png";
import Caricature from "../assets/caricature.png";
import Landscape from "../assets/landscape.jpg";
import Portrait from "../assets/portrait.jpg";
import Others from "../assets/other.png";

const artists = [
  {
    name: "Digital Art",
    image: DigitalArt,
  },
  {
    name: "Logo",
    image: LogoArt,
  },
  {
    name: "Painting",
    image: Painting,
  },
  {
    name: "Caricature",
    image: Caricature,
  },
  {
    name: "Landscape",
    image: Landscape,
  },
  {
    name: "Portrait",
    image: Portrait,
  },
  {
    name: "Other",
    image: Others,
  },
];

export default function ArtStories() {
  return (
    <div className="py-10 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-[30px] font-semibold mb-6 baskervville-400">
          Art Stories
        </h2>
        <p className="text-[20px] baskervville-400">that you find interesting.</p>
      </div>

      <div className="flex flex-wrap justify-between items-center">
        {artists.map((artist, index) => (
          <div key={index} className="flex flex-col items-center w-[96px]">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-[100px] h-[100px] object-cover rounded-full shadow-md"
            />
            <p className="text-[18px] text-center mt-2 urbanist-400">
              {artist.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
