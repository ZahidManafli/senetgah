import React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Frame1 from "../assets/Frame1.png";
// import soundSVG from "../assets/svgg1.png";
import ArtStories from "../components/ArtStories";
import ExploreTaste from "../components/ExploreTaste";
import ColorPicker from "../components/ColorPicker";
import { Link } from "react-router-dom";
import { getUserPosts } from "../services/addWorkServices";

export default function HomePage() {

  React.useEffect(() => {
    const fetchPosts = async () => {
      const _result = await getUserPosts();

      console.log(_result);
    };
    fetchPosts();
  }, [])

  return (
    <div className="min-h-screen font-sans">
      <h1 className="text-4xl font-semibold mb-6 baskervville-400">Daily Art Dose</h1>

      <div className="grid w-[100%] grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Art Card */}
        <div className="relative col-span-8 h-[100%] group overflow-hidden rounded-xl shadow-lg">
          <img
            src={Frame1} // Replace with your image path
            alt="Sunflower Field"
            className="object-cover w-full h-[100%]"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-5 py-4 text-white">
            <h2 className="text-xl font-baskervville baskervville-400">Sunflower Field</h2>
            <p className="text-sm italic baskervville-400">Tahir Salahov</p>
          </div>
          <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow">
            <ArrowUpRightIcon className="h-5 w-5 text-black" />
          </button>
        </div>

        {/* AI Overview */}
        <div className="h-[100%] col-span-4 bg-[#e9e7d6] p-5 rounded-xl shadow-md">
          <h3 className="text-[28px] font-semibold mb-2 urbanist-400">AI Overview</h3>
          <p className="text-[16px] text-gray-800 font-baskervville urbanist-400">
            This painting by the famous Azerbaijani artist Tahir Salahov shows a
            bright field of sunflowers with tall, dark mountains in the
            background and power lines crossing the scene. Painted in an
            impressionistic style, it mixes the beauty of nature with a touch of
            modern life. The warm yellow flowers bring feelings of joy and
            energy, while...
          </p>
        </div>

        {/* Daily Quiz
        <div className="flex flex-col gap-4 col-span-3">
          <div className="p-3 rounded-xl bg-[#e9e7d6] flex justify-between items-center">
            <button className="bg-[#FBFAEE] text-[#212121] rounded-md flex items-center px-3 py-1">
              <span className="text-sm font-medium">Play the Sound</span>
            </button>
            <img
              src={soundSVG} // Replace with your waveform SVG
              alt="Sound"
              className="s-6"
            />
          </div>

          <div className="bg-[#e9e7d6] p-5 rounded-xl shadow-md flex flex-col gap-4">
            <h4 className="text-[28px] font-semibold">Daily Quiz</h4>
            <p className="text-[16px] text-gray-700 mb-2">
              Which artistic style is this painting by Tahir Salahov an example
              of?
            </p>

            <form className="grid grid-cols-2 text-sm gap-2">
              <label>
                <input type="checkbox" className="mr-2" /> Realism
              </label>
              <label>
                <input type="checkbox" className="mr-2" /> Surrealism
              </label>
              <label>
                <input type="checkbox" className="mr-2" /> Impressionism
              </label>
              <label>
                <input type="checkbox" className="mr-2" /> Cubism
              </label>
              <div className="col-span-2 w-full flex items-center justify-center">
                <button
                  type="submit"
                  className="mt-3 bg-[#FBFAEE] text-[#212121] text-[16px] py-2 px-5 w-max rounded-md mx-auto"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div> */}
      </div>
      <ArtStories />
      <ExploreTaste />
      <ColorPicker />


    </div>
  );
}
