import React from "react";
import {
  FaInstagram,
  FaXTwitter,
  FaTiktok,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#f2f0db] text-center py-10 rounded-xl">
      <h1 className="text-3xl font-serif text-gray-900 mb-4 baskervville-400">Sanatgah</h1>
      
      <nav className="flex justify-center gap-6 text-sm text-gray-800 mb-6">
        <a href="#" className="hover:underline urbanist-400">Home</a>
        <a href="#" className="hover:underline urbanist-400">Vote Arts</a>
        <a href="#" className="hover:underline urbanist-400">Gallery</a>
        <a href="#" className="hover:underline urbanist-400">Blog</a>
      </nav>

      <div className="flex justify-center gap-6 text-[#c4a14a] text-xl mb-4">
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaXTwitter /></a>
        <a href="#"><FaTiktok /></a>
      </div>

      <p className="text-xs text-gray-600 urbanist-400">
        © Sanatgah 2025, All Rights Reserved
      </p>
    </footer>
  );
}
