import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./layout.css"; // Optional for styling
import Navbar from "../common/Navbar";

export default function MainLayout() {
  return (
    <div className="layout">
      <Navbar />  
      {/* <div class="p-4 sm:ml-64 m-auto">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Outlet />
        </div>
      </div> */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
